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

    // Keep under Groq token budget (llama-3.3-70b has 128k ctx; prompt + response < 16k is safe)
    const maxDiffLength = 28000;
    const truncatedDiff =
      diffContext.length > maxDiffLength
        ? diffContext.substring(0, maxDiffLength) +
          '\n\n... [diff truncated to fit context window]'
        : diffContext;

    const filesList = onlyWithDiff.map((f) => `- ${f.filename} (${f.status})`).join('\n');

    const systemPrompt = `You are a senior staff engineer performing a rigorous code review.
You produce reviews on par with Greptile — thorough, specific, technically deep, and actionable.

Rules for your output:
1. Respond with ONLY a valid JSON object — no markdown, no prose, no code fences around the JSON.
2. Every comment must cite an exact file and line range when possible.
3. For every comment, provide a "codeBefore" snippet (from the diff) AND a "codeAfter" snippet (the suggested replacement).
4. Be SPECIFIC, not generic. "Add validation" is bad. "Add zod schema validating email format and password length >= 8" is good.
5. Explain the WHY behind each issue — what can go wrong, what the real-world impact is.
6. Use priorities: P1 (must fix — security/correctness), P2 (should fix — bugs/performance), P3 (nice to have — polish).`;

    const userPrompt = `Perform a deep code review for this pull request.

## PR METADATA
Title: ${prTitle}
Description: ${prDescription || '(no description provided)'}

## FILES CHANGED
${filesList}

## DIFFS
${truncatedDiff}

## YOUR TASK

Return a JSON object matching this EXACT schema (ALL fields required — use empty arrays/null where not applicable):

{
  "score": <integer 0-100. 80+ = approved. Consider: correctness, security, performance, maintainability, test coverage>,
  "verdict": "<approved|changes_requested>",
  "confidenceScore": <integer 1-5. How confident you are this review is complete and correct. 5 = very confident, diff was fully analyzable. 1 = low confidence, diff was too large or unclear>,
  "confidenceReason": "<one sentence explaining the confidence score>",
  "overallFeedback": "<3-5 sentence high-level summary: what the PR does, its main risks, overall technical impression, and recommendation>",
  "keyChanges": [
    "<bullet point describing a major change — e.g. 'Introduces JWT-based session cookies replacing in-memory session storage'>",
    "<another bullet>"
  ],
  "issuesFound": [
    "<high-level concern — e.g. 'Authentication logic does not rate-limit login attempts, allowing brute-force attacks'>",
    "<another concern>"
  ],
  "fileOverviews": [
    {
      "filename": "<exact path from diff>",
      "overview": "<1-2 sentences describing what this file does and what changed>",
      "concerns": ["<specific concern in this file>", "..."]
    }
  ],
  "flowchart": "<OPTIONAL: Mermaid 'graph TD' code if this PR introduces or meaningfully modifies CONTROL FLOW, business logic, auth flows, API handler chains, state machines, or data pipelines. Use syntax: graph TD\\n  A[Node] --> B[Node]\\n  B -->|label| C[Node]\\nSet to null for purely UI/styling/docs/config PRs.>",
  "comments": [
    {
      "priority": "<P1|P2|P3>",
      "type": "<security|bug|performance|maintainability|style|suggestion>",
      "severity": "<critical|warning|info>",
      "title": "<5-10 word title — e.g. 'Missing CSRF token validation'>",
      "description": "<2-5 sentence technical explanation: what the issue is, WHY it matters (real impact), and context about the broader codebase implication>",
      "file": "<exact filename from diff>",
      "startLine": <integer line number from the diff or null>,
      "endLine": <integer line number or null>,
      "codeBefore": "<the exact problematic code snippet copied verbatim from the diff. Include enough context (2-6 lines)>",
      "codeAfter": "<the suggested replacement code the developer should use instead — must be a drop-in substitute>",
      "rationale": [
        "<bullet reason 1 — e.g. 'crypto.timingSafeEqual prevents timing attacks in auth comparisons'>",
        "<bullet reason 2>"
      ]
    }
  ]
}

## PRIORITY GUIDE
- **P1 (MUST FIX)**: Security vulnerabilities (SQL injection, XSS, CSRF, auth bypass, secret exposure), data corruption/loss risks, null deref / crashes in hot paths, regressions that break existing functionality.
- **P2 (SHOULD FIX)**: Performance issues (N+1 queries, O(n²) where O(n) works, missing indexes), correctness bugs in edge cases, missing error handling, race conditions, memory leaks.
- **P3 (NICE TO HAVE)**: Code smells, naming, unused code, minor duplication, missing types, style issues.

## FLOWCHART GUIDE
Include a Mermaid flowchart ONLY when the PR adds or modifies meaningful control flow:
- Auth/login/signup flows
- Request handler logic with branching
- State machines
- Data pipelines / ETL
- Event-driven flows (webhooks, queues)

Example flowchart:
graph TD
  A[Client POST /login] --> B{Valid credentials?}
  B -->|Yes| C[Issue JWT]
  B -->|No| D[Return 401]
  C --> E[Set HttpOnly cookie]
  E --> F[Redirect to /dashboard]

DO NOT include a flowchart for:
- Pure UI/styling changes
- Documentation updates
- Dependency bumps
- Config tweaks

## QUALITY BAR
- Every comment must be GROUNDED in the actual diff. Do not invent issues not supported by the code shown.
- Comments must be ACTIONABLE. "codeAfter" must be a real working replacement, not pseudocode.
- Between 3 and 10 comments, sorted by priority (P1 first). Don't pad with trivial nits.
- fileOverviews must include EVERY file in the diff.
- overallFeedback should read like a senior reviewer's note, not marketing copy.

Now produce the JSON review. Remember: ONLY the JSON object, nothing else.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2, // low — we want deterministic, rigorous output
      max_tokens: 8000,
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
