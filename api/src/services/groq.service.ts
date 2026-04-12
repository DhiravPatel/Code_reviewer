import Groq from 'groq-sdk';
import { env } from '../config/env';

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

interface ReviewComment {
  type: 'security' | 'warning' | 'suggestion';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  file: string;
  line: number | null;
  details: string[];
}

interface ReviewResult {
  score: number;
  verdict: 'approved' | 'changes_requested';
  comments: ReviewComment[];
  summary: {
    criticalIssues: number;
    warnings: number;
    suggestions: number;
  };
  overallFeedback: string;
}

export class GroqService {
  /**
   * Analyze a pull request diff using Groq AI.
   */
  static async reviewPullRequest(params: {
    prTitle: string;
    prDescription: string;
    files: { filename: string; patch: string; status: string }[];
    language?: string;
  }): Promise<ReviewResult> {
    const { prTitle, prDescription, files } = params;

    // Build the diff context
    const diffContext = files
      .filter((f) => f.patch) // only files with actual diffs
      .map((f) => `--- File: ${f.filename} (${f.status}) ---\n${f.patch}`)
      .join('\n\n');

    // Truncate if too long (Groq has token limits)
    const maxDiffLength = 12000;
    const truncatedDiff = diffContext.length > maxDiffLength
      ? diffContext.substring(0, maxDiffLength) + '\n\n... [diff truncated for length]'
      : diffContext;

    const prompt = `You are an expert code reviewer. Analyze this pull request and provide a structured review.

## Pull Request
**Title:** ${prTitle}
**Description:** ${prDescription || 'No description provided.'}

## Code Changes
${truncatedDiff}

## Instructions
Review the code changes and respond with ONLY valid JSON (no markdown, no code blocks) in this exact format:
{
  "score": <number 0-100>,
  "verdict": "<approved|changes_requested>",
  "overallFeedback": "<2-3 sentence summary>",
  "comments": [
    {
      "type": "<security|warning|suggestion>",
      "severity": "<critical|warning|info>",
      "title": "<short title>",
      "description": "<detailed explanation>",
      "file": "<filename>",
      "line": <line number or null>,
      "details": ["<actionable item 1>", "<actionable item 2>"]
    }
  ]
}

Rules:
- Score 80+ = approved, below 80 = changes_requested
- Mark security vulnerabilities (XSS, injection, auth issues) as type "security" with severity "critical"
- Mark performance issues, potential bugs as type "warning"
- Mark code style, best practices as type "suggestion"
- Be specific about file names and line numbers when possible
- Provide actionable, constructive feedback
- Keep comments between 2-8 items, focusing on the most important issues`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a senior code reviewer. Respond with ONLY valid JSON. No markdown formatting, no code blocks, no extra text.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const responseText = completion.choices[0]?.message?.content?.trim() || '';

    // Parse the JSON response — handle potential markdown wrapping
    let parsed: any;
    try {
      // Try direct parse first
      parsed = JSON.parse(responseText);
    } catch {
      // Try extracting JSON from markdown code block
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch && jsonMatch[1]) {
        parsed = JSON.parse(jsonMatch[1].trim());
      } else {
        // Try finding JSON object in the text
        const braceStart = responseText.indexOf('{');
        const braceEnd = responseText.lastIndexOf('}');
        if (braceStart !== -1 && braceEnd !== -1) {
          parsed = JSON.parse(responseText.substring(braceStart, braceEnd + 1));
        } else {
          throw new Error('Failed to parse AI review response');
        }
      }
    }

    const comments: ReviewComment[] = (parsed.comments || []).map((c: any) => ({
      type: c.type || 'suggestion',
      severity: c.severity || 'info',
      title: c.title || 'Review Comment',
      description: c.description || '',
      file: c.file || 'unknown',
      line: c.line || null,
      details: c.details || [],
    }));

    const score = Math.max(0, Math.min(100, parsed.score || 50));
    const criticalIssues = comments.filter((c) => c.severity === 'critical').length;
    const warnings = comments.filter((c) => c.type === 'warning' || c.severity === 'warning').length;
    const suggestions = comments.filter((c) => c.type === 'suggestion').length;

    return {
      score,
      verdict: score >= 80 ? 'approved' : 'changes_requested',
      comments,
      summary: { criticalIssues, warnings, suggestions },
      overallFeedback: parsed.overallFeedback || '',
    };
  }
}
