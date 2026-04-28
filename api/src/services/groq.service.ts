import Groq from 'groq-sdk';
import { env } from '../config/env';

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

// ─── Types ────────────────────────────────────────────────────────

export interface ReviewComment {
  priority: 'P1' | 'P2' | 'P3';
  type: 'security' | 'bug' | 'performance' | 'maintainability' | 'style' | 'suggestion';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  file: string;
  startLine: number | null;
  endLine: number | null;
  codeBefore: string;
  codeAfter: string;
  rationale: string[];
}

export interface FileOverview {
  filename: string;
  overview: string;
  concerns: string[];
}

export interface ReviewResult {
  score: number;
  verdict: 'approved' | 'changes_requested';
  confidenceScore: number;
  confidenceReason: string;
  overallFeedback: string;
  keyChanges: string[];
  issuesFound: string[];
  fileOverviews: FileOverview[];
  flowchart: string | null;
  comments: ReviewComment[];
  summary: {
    criticalIssues: number;
    warnings: number;
    suggestions: number;
  };
}

// ─── Service ──────────────────────────────────────────────────────

export class GroqService {
  /**
   * Deep code review with Greptile-quality output:
   *   - PR summary + key changes
   *   - Issues found (high-level)
   *   - Confidence score with reasoning
   *   - Per-file overviews with concerns
   *   - Optional Mermaid flowchart for logic-heavy PRs
   *   - Prioritized inline comments with actual suggested code replacements
   */
  static async reviewPullRequest(params: {
    prTitle: string;
    prDescription: string;
    files: { filename: string; patch: string; status: string }[];
    language?: string;
  }): Promise<ReviewResult> {
    const { prTitle, prDescription, files } = params;

    const onlyWithDiff = files.filter((f) => f.patch);

    // Build the diff context — include file status (added/modified/deleted)
    const diffContext = onlyWithDiff
      .map(
        (f) =>
          `### File: ${f.filename}  [status: ${f.status}]\n\`\`\`diff\n${f.patch}\n\`\`\``
      )
      .join('\n\n');

    // Sized to fit Groq free-tier 12k TPM cap: ~4.5k diff + ~0.7k prompt + 4k output ≈ 9.2k.
    const maxDiffLength = 18000;
    const truncatedDiff =
      diffContext.length > maxDiffLength
        ? diffContext.substring(0, maxDiffLength) + '\n\n... [diff truncated]'
        : diffContext;

    const filesList = onlyWithDiff.map((f) => `- ${f.filename} (${f.status})`).join('\n');

    const systemPrompt = `You are a senior staff engineer doing a rigorous code review.
Output ONLY a valid JSON object — no markdown, no prose, no code fences. Every comment cites file + line range, includes verbatim "codeBefore" from the diff and a working drop-in "codeAfter", and explains WHY it matters. Be specific (not "add validation" — name the schema/check). Priorities: P1=security/correctness, P2=bugs/perf, P3=polish.`;

    const userPrompt = `Review this PR. Return ONLY the JSON object.

## PR
Title: ${prTitle}
Description: ${prDescription || '(none)'}

## Files
${filesList}

## Diffs
${truncatedDiff}

## Schema (all fields required; use [] or null if N/A)
{
  "score": <int 0-100; 80+ = approved; weigh correctness, security, perf, maintainability, tests>,
  "verdict": "approved" | "changes_requested",
  "confidenceScore": <int 1-5; 5=diff fully analyzable, 1=truncated/unclear>,
  "confidenceReason": "<one sentence>",
  "overallFeedback": "<3-5 sentences: what the PR does, main risks, recommendation>",
  "keyChanges": ["<bullet>", ...],
  "issuesFound": ["<high-level concern>", ...],
  "fileOverviews": [{"filename": "<exact path>", "overview": "<1-2 sentences>", "concerns": ["..."]}],
  "flowchart": "<Mermaid 'graph TD' ONLY if PR adds/changes auth, branching request handlers, state machines, data pipelines, or webhook/queue flows; null for pure UI/styling/docs/config/deps>",
  "comments": [{
    "priority": "P1" | "P2" | "P3",
    "type": "security" | "bug" | "performance" | "maintainability" | "style" | "suggestion",
    "severity": "critical" | "warning" | "info",
    "title": "<5-10 words>",
    "description": "<2-5 sentences: what, WHY it matters, broader impact>",
    "file": "<exact path from diff>",
    "startLine": <int|null>,
    "endLine": <int|null>,
    "codeBefore": "<verbatim from diff, 2-6 lines>",
    "codeAfter": "<drop-in working replacement>",
    "rationale": ["<reason>", ...]
  }]
}

## Priorities
- P1: security (injection, XSS, CSRF, auth bypass, secret exposure), data corruption, crashes, regressions
- P2: perf (N+1, O(n²), missing indexes), edge-case bugs, missing error handling, races, leaks
- P3: code smells, naming, dead code, missing types, style

## Rules
- Comments grounded in the diff — no invented issues.
- 3-10 comments, sorted P1 → P3. No trivial padding.
- fileOverviews must cover every file in the diff.
- overallFeedback reads like a senior reviewer's note, not marketing copy.
- codeAfter must be real working code, not pseudocode.

Return the JSON now.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 4000,
      response_format: { type: 'json_object' } as any,
    });

    const responseText = completion.choices[0]?.message?.content?.trim() || '';
    const parsed = parseJsonSafely(responseText);

    // ─── Normalize + sanitize ──────────────────────────────────
    const comments: ReviewComment[] = (parsed.comments || []).map((c: any) => ({
      priority: normalizePriority(c.priority),
      type: normalizeType(c.type),
      severity: normalizeSeverity(c.severity, c.priority),
      title: String(c.title || 'Review Comment'),
      description: String(c.description || ''),
      file: String(c.file || 'unknown'),
      startLine: toIntOrNull(c.startLine ?? c.line),
      endLine: toIntOrNull(c.endLine ?? c.line),
      codeBefore: String(c.codeBefore || ''),
      codeAfter: String(c.codeAfter || ''),
      rationale: Array.isArray(c.rationale)
        ? c.rationale.map(String)
        : Array.isArray(c.details)
        ? c.details.map(String)
        : [],
    }));

    // Sort comments by priority (P1 > P2 > P3)
    const priorityRank = { P1: 0, P2: 1, P3: 2 };
    comments.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);

    const fileOverviews: FileOverview[] = (parsed.fileOverviews || []).map((f: any) => ({
      filename: String(f.filename || ''),
      overview: String(f.overview || ''),
      concerns: Array.isArray(f.concerns) ? f.concerns.map(String) : [],
    }));

    const score = Math.max(0, Math.min(100, parseInt(parsed.score, 10) || 50));
    const confidenceScore = Math.max(1, Math.min(5, parseInt(parsed.confidenceScore, 10) || 3));

    const criticalIssues = comments.filter((c) => c.priority === 'P1' || c.severity === 'critical').length;
    const warnings = comments.filter((c) => c.priority === 'P2' || c.severity === 'warning').length;
    const suggestions = comments.filter((c) => c.priority === 'P3' || c.severity === 'info').length;

    const flowchart = typeof parsed.flowchart === 'string' && parsed.flowchart.trim()
      ? sanitizeFlowchart(parsed.flowchart)
      : null;

    return {
      score,
      verdict: score >= 80 ? 'approved' : 'changes_requested',
      confidenceScore,
      confidenceReason: String(parsed.confidenceReason || ''),
      overallFeedback: String(parsed.overallFeedback || ''),
      keyChanges: Array.isArray(parsed.keyChanges) ? parsed.keyChanges.map(String) : [],
      issuesFound: Array.isArray(parsed.issuesFound) ? parsed.issuesFound.map(String) : [],
      fileOverviews,
      flowchart,
      comments,
      summary: { criticalIssues, warnings, suggestions },
    };
  }
}

// ─── Helpers ──────────────────────────────────────────────────────

function parseJsonSafely(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    // Fallback 1: extract from markdown code block
    const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim());
      } catch { /* fall through */ }
    }
    // Fallback 2: grab the largest {...} block
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(text.substring(start, end + 1));
      } catch { /* fall through */ }
    }
    throw new Error('Failed to parse AI review response as JSON');
  }
}

function normalizePriority(p: any): 'P1' | 'P2' | 'P3' {
  const s = String(p || '').toUpperCase();
  if (s === 'P1') return 'P1';
  if (s === 'P2') return 'P2';
  if (s === 'P3') return 'P3';
  return 'P3';
}

function normalizeType(t: any): ReviewComment['type'] {
  const s = String(t || '').toLowerCase();
  if (['security', 'bug', 'performance', 'maintainability', 'style', 'suggestion'].includes(s)) {
    return s as ReviewComment['type'];
  }
  // Map old types
  if (s === 'warning') return 'bug';
  return 'suggestion';
}

function normalizeSeverity(sev: any, priority: any): ReviewComment['severity'] {
  const s = String(sev || '').toLowerCase();
  if (['critical', 'warning', 'info'].includes(s)) return s as ReviewComment['severity'];
  // Derive from priority
  const p = String(priority || '').toUpperCase();
  if (p === 'P1') return 'critical';
  if (p === 'P2') return 'warning';
  return 'info';
}

function toIntOrNull(v: any): number | null {
  if (v == null) return null;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

/** Strip fenced code-block markers if the model wrapped the flowchart */
function sanitizeFlowchart(raw: string): string {
  const stripped = raw.trim()
    .replace(/^```(?:mermaid)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
  // Ensure it looks like a mermaid diagram
  if (!/^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram)/i.test(stripped)) {
    return `graph TD\n${stripped}`;
  }
  return stripped;
}
