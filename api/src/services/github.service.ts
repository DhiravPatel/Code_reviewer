import { env } from '../config/env';

interface ReviewComment {
  priority?: 'P1' | 'P2' | 'P3';
  type: string;
  severity: string;
  title: string;
  description: string;
  file: string;
  startLine?: number | null;
  endLine?: number | null;
  line?: number | null; // legacy
  codeBefore?: string;
  codeAfter?: string;
  rationale?: string[];
  details?: string[]; // legacy
}

interface FileOverview {
  filename: string;
  overview: string;
  concerns: string[];
}

interface ReviewData {
  score: number;
  verdict: string;
  confidenceScore?: number;
  confidenceReason?: string;
  overallFeedback: string;
  keyChanges?: string[];
  issuesFound?: string[];
  fileOverviews?: FileOverview[];
  flowchart?: string | null;
  comments: ReviewComment[];
  summary: { criticalIssues: number; warnings: number; suggestions: number };
}

/** Hidden marker embedded in every comment we post so re-runs can identify them. */
const COMMENT_MARKER = '<!-- codereview-ai:v1 -->';

export interface InlineReviewComment {
  path: string;
  startLine: number;
  endLine: number;
  side?: 'RIGHT' | 'LEFT';
  body: string;
}

export class GithubService {
  static get COMMENT_MARKER() {
    return COMMENT_MARKER;
  }
  // ─── Webhook Management ────────────────────────────────────────

  /**
   * Register a webhook on a GitHub repository for PR events.
   */
  static async createWebhook(accessToken: string, owner: string, repo: string): Promise<number> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/hooks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'CodeReview-App',
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'web',
        active: true,
        events: ['pull_request'],
        config: {
          url: `${env.API_BASE_URL}/api/v1/webhooks/github`,
          content_type: 'json',
          secret: env.WEBHOOK_SECRET,
          insecure_ssl: '0',
        },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      // If webhook already exists, try to find and return it
      if (response.status === 422 && errBody.includes('already exists')) {
        const existing = await this.findExistingWebhook(accessToken, owner, repo);
        if (existing) return existing;
      }
      throw new Error(`Failed to create webhook: ${response.status} ${errBody}`);
    }

    const data = (await response.json()) as any;
    return data.id;
  }

  /**
   * Find an existing CodeReview webhook on a repo.
   */
  static async findExistingWebhook(accessToken: string, owner: string, repo: string): Promise<number | null> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/hooks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'CodeReview-App',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) return null;

    const hooks = (await response.json()) as any[];
    const webhookUrl = `${env.API_BASE_URL}/api/v1/webhooks/github`;
    const existing = hooks.find((h: any) => h.config?.url === webhookUrl);
    return existing?.id || null;
  }

  /**
   * Remove a webhook from a GitHub repository.
   */
  static async deleteWebhook(accessToken: string, owner: string, repo: string, webhookId: number): Promise<void> {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/hooks/${webhookId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    // 404 means already deleted — that's fine
    if (!response.ok && response.status !== 404) {
      throw new Error(`Failed to delete webhook: ${response.status}`);
    }
  }

  // ─── PR Comment Management ─────────────────────────────────────

  /**
   * Post a "reviewing..." loading comment on a PR.
   * Returns the comment ID so we can update it later.
   */
  static async postLoadingComment(
    accessToken: string,
    owner: string,
    repo: string,
    prNumber: number
  ): Promise<bigint> {
    const body = this.buildLoadingCommentBody();

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to post comment: ${response.status}`);
    }

    const data = (await response.json()) as any;
    return BigInt(data.id);
  }

  /**
   * Update an existing comment with the completed review.
   */
  static async updateComment(
    accessToken: string,
    owner: string,
    repo: string,
    commentId: bigint,
    review: ReviewData
  ): Promise<void> {
    const body = this.buildReviewCommentBody(review);

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/comments/${commentId.toString()}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update comment: ${response.status}`);
    }
  }

  /**
   * Post a fresh review comment (if no loading comment was posted).
   */
  static async postReviewComment(
    accessToken: string,
    owner: string,
    repo: string,
    prNumber: number,
    review: ReviewData
  ): Promise<bigint> {
    const body = this.buildReviewCommentBody(review);

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to post review comment: ${response.status}`);
    }

    const data = (await response.json()) as any;
    return BigInt(data.id);
  }

  // ─── Apply Fix (Contents API) ──────────────────────────────────

  /**
   * Apply a code fix by replacing lines [startLine, endLine] in `filePath`
   * with `codeAfter`, committing directly to `branch`.
   *
   * Uses GitHub's Contents API (read → splice → PUT) which atomically rejects
   * the write if the file's SHA changed in between (no stale writes).
   *
   * If `codeBefore` is provided we sanity-check that the existing lines still
   * match (whitespace-insensitive) before writing — if the file moved on
   * since the review ran, we refuse instead of clobbering unrelated code.
   */
  static async applyFileFix(params: {
    accessToken: string;
    owner: string;
    repo: string;
    branch: string;
    filePath: string;
    startLine: number;
    endLine: number;
    codeBefore: string;
    codeAfter: string;
    commitMessage: string;
  }): Promise<{ commitSha: string; commitUrl: string }> {
    const { accessToken, owner, repo, branch, filePath, startLine, endLine, codeBefore, codeAfter, commitMessage } = params;

    // 1) Read the current file at the branch tip
    const getRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${encodeFilePath(filePath)}?ref=${encodeURIComponent(branch)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    if (!getRes.ok) {
      throw new Error(`Failed to read file: ${getRes.status} ${await getRes.text()}`);
    }
    const fileData = (await getRes.json()) as { content: string; sha: string; encoding: string };
    if (fileData.encoding !== 'base64') {
      throw new Error(`Unexpected file encoding: ${fileData.encoding}`);
    }

    const original = Buffer.from(fileData.content, 'base64').toString('utf8');
    const lines = original.split('\n');

    if (startLine < 1 || endLine < startLine || endLine > lines.length) {
      throw new Error(
        `Line range ${startLine}-${endLine} is out of bounds (file has ${lines.length} lines)`
      );
    }

    // 2) Sanity-check that the targeted lines still look like codeBefore.
    if (codeBefore && codeBefore.trim()) {
      const targeted = lines.slice(startLine - 1, endLine).join('\n');
      if (normalize(targeted) !== normalize(codeBefore)) {
        throw new Error(
          'File contents at the target lines have changed since the review was generated. Re-run the review and try again.'
        );
      }
    }

    // 3) Splice in codeAfter
    const replacement = codeAfter.replace(/\r\n/g, '\n').split('\n');
    const updatedLines = [
      ...lines.slice(0, startLine - 1),
      ...replacement,
      ...lines.slice(endLine),
    ];
    const updated = updatedLines.join('\n');

    if (updated === original) {
      throw new Error('Fix is a no-op — codeAfter matches the current file contents.');
    }

    // 4) Commit via PUT
    const putRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${encodeFilePath(filePath)}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: Buffer.from(updated, 'utf8').toString('base64'),
          sha: fileData.sha,
          branch,
        }),
      }
    );

    if (!putRes.ok) {
      throw new Error(`Failed to commit fix: ${putRes.status} ${await putRes.text()}`);
    }

    const putData = (await putRes.json()) as { commit: { sha: string; html_url: string } };
    return { commitSha: putData.commit.sha, commitUrl: putData.commit.html_url };
  }

  // ─── Inline Review (PR Reviews API) ────────────────────────────

  /**
   * Submit a PR review with inline comments (each can carry a ```suggestion block).
   * Uses event="COMMENT" so we never auto-approve or block; the score-based verdict
   * is communicated through the summary issue-comment instead.
   */
  static async submitPrReview(
    accessToken: string,
    owner: string,
    repo: string,
    prNumber: number,
    comments: InlineReviewComment[]
  ): Promise<number | null> {
    if (comments.length === 0) return null;

    const body = {
      event: 'COMMENT',
      body: '',
      comments: comments.map((c) => {
        const base: Record<string, unknown> = {
          path: c.path,
          line: c.endLine,
          side: c.side || 'RIGHT',
          body: c.body,
        };
        if (c.startLine !== c.endLine) {
          base.start_line = c.startLine;
          base.start_side = c.side || 'RIGHT';
        }
        return base;
      }),
    };

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/reviews`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Failed to submit PR review: ${response.status} ${errBody}`);
    }

    const data = (await response.json()) as { id: number };
    return data.id;
  }

  /**
   * Delete inline review comments previously posted by this app, identified by
   * the hidden COMMENT_MARKER. Best-effort — individual failures are swallowed
   * so a stuck comment never blocks a re-run.
   */
  static async deleteOurReviewComments(
    accessToken: string,
    owner: string,
    repo: string,
    prNumber: number
  ): Promise<number> {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/comments?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) return 0;

    const all = (await response.json()) as Array<{ id: number; body?: string }>;
    const ours = all.filter((c) => c.body && c.body.includes(COMMENT_MARKER));

    let deleted = 0;
    await Promise.all(
      ours.map(async (c) => {
        try {
          const del = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/pulls/comments/${c.id}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'User-Agent': 'CodeReview-App',
                Accept: 'application/vnd.github.v3+json',
              },
            }
          );
          if (del.ok || del.status === 404) deleted++;
        } catch {
          // best-effort
        }
      })
    );

    return deleted;
  }

  /**
   * Render an inline review comment body — includes the hidden marker, a
   * priority/title header, the rationale, and (if codeAfter is present and
   * applies cleanly) a GitHub ```suggestion block.
   */
  static buildInlineCommentBody(c: ReviewComment, useSuggestion: boolean): string {
    const priority = c.priority || derivePriority(c);
    const badge = priorityBadgeFor(priority);
    const lines: string[] = [];
    lines.push(COMMENT_MARKER);
    lines.push(`**${badge} ${c.title}**`);
    lines.push('');
    if (c.description) {
      lines.push(c.description);
      lines.push('');
    }
    const reasons = (c.rationale && c.rationale.length > 0) ? c.rationale : (c.details || []);
    if (reasons.length > 0) {
      for (const r of reasons) lines.push(`- ${r}`);
      lines.push('');
    }
    if (useSuggestion && c.codeAfter && c.codeAfter.trim()) {
      lines.push('```suggestion');
      lines.push(stripTrailingNewline(c.codeAfter));
      lines.push('```');
    }
    return lines.join('\n');
  }

  // ─── Comment Body Formatting ───────────────────────────────────

  private static buildLoadingCommentBody(): string {
    return [
      COMMENT_MARKER,
      '## <img src="https://img.icons8.com/fluency/24/artificial-intelligence.png" width="20" /> CodeReview AI',
      '',
      '> **Analyzing your pull request...** This usually takes 15–30 seconds.',
    ].join('\n');
  }

  private static buildReviewCommentBody(review: ReviewData): string {
    const scoreEmoji = review.score >= 80 ? '🟢' : review.score >= 60 ? '🟡' : '🔴';
    const verdictText = review.verdict === 'approved' ? '✅ Approved' : '⚠️ Changes Requested';
    const conf = review.confidenceScore || 0;

    const lines: string[] = [];

    lines.push(COMMENT_MARKER);
    // ─── Header ────────────────────────────────────────────
    lines.push('## 🤖 CodeReview AI — Summary');
    lines.push('');
    lines.push(review.overallFeedback || 'Review completed.');
    lines.push('');

    // ─── Key Changes ───────────────────────────────────────
    if (review.keyChanges && review.keyChanges.length > 0) {
      lines.push('**Key changes:**');
      lines.push('');
      for (const c of review.keyChanges) lines.push(`- ${c}`);
      lines.push('');
    }

    // ─── Issues Found ──────────────────────────────────────
    if (review.issuesFound && review.issuesFound.length > 0) {
      lines.push('**Issues found:**');
      lines.push('');
      for (const i of review.issuesFound) lines.push(`- ${i}`);
      lines.push('');
    }

    // ─── Confidence + Score Table ──────────────────────────
    if (conf > 0) {
      lines.push(`### Confidence Score: ${conf}/5`);
      lines.push('');
      if (review.confidenceReason) {
        lines.push(review.confidenceReason);
        lines.push('');
      }
    }

    lines.push('### Summary');
    lines.push('');
    lines.push('| Metric | Value |');
    lines.push('|--------|-------|');
    lines.push(`| **Score** | ${scoreEmoji} **${review.score}/100** |`);
    lines.push(`| **Verdict** | ${verdictText} |`);
    lines.push(`| **Critical Issues (P1)** | ${review.summary.criticalIssues} |`);
    lines.push(`| **Warnings (P2)** | ${review.summary.warnings} |`);
    lines.push(`| **Suggestions (P3)** | ${review.summary.suggestions} |`);
    lines.push('');

    // ─── Important Files Changed Table ─────────────────────
    if (review.fileOverviews && review.fileOverviews.length > 0) {
      lines.push('### Important Files Changed');
      lines.push('');
      lines.push('| Filename | Overview |');
      lines.push('|----------|----------|');
      for (const f of review.fileOverviews) {
        const overview = f.overview.replace(/\|/g, '\\|').replace(/\n/g, ' ');
        lines.push(`| \`${f.filename}\` | ${overview} |`);
      }
      lines.push('');
    }

    // ─── Mermaid Flowchart ─────────────────────────────────
    if (review.flowchart && review.flowchart.trim()) {
      lines.push('### Flowchart');
      lines.push('');
      lines.push('```mermaid');
      lines.push(review.flowchart);
      lines.push('```');
      lines.push('');
    }

    // ─── Review Comments (with code suggestions) ───────────
    if (review.comments.length > 0) {
      lines.push('### Review Comments');
      lines.push('');

      for (const c of review.comments) {
        const priority = c.priority || derivePriority(c);
        const priorityBadge = priorityBadgeFor(priority);
        const startLine = c.startLine ?? c.line;
        const endLine = c.endLine ?? c.line;
        const lineRef = startLine
          ? `:${startLine}${endLine && endLine !== startLine ? `-${endLine}` : ''}`
          : '';
        const fileRef = c.file ? ` — \`${c.file}${lineRef}\`` : '';

        lines.push(`#### ${priorityBadge} ${c.title}${fileRef}`);
        lines.push('');
        lines.push(c.description);
        lines.push('');

        // Rationale bullets (fall back to legacy `details`)
        const reasons = (c.rationale && c.rationale.length > 0)
          ? c.rationale
          : (c.details || []);
        if (reasons.length > 0) {
          for (const r of reasons) lines.push(`- ${r}`);
          lines.push('');
        }

        // Suggested code change
        if (c.codeAfter && c.codeAfter.trim()) {
          lines.push('<details><summary><b>Suggested change</b></summary>');
          lines.push('');
          if (c.codeBefore && c.codeBefore.trim()) {
            lines.push('**Before:**');
            lines.push('```');
            lines.push(c.codeBefore);
            lines.push('```');
            lines.push('');
          }
          lines.push('**After:**');
          lines.push('```');
          lines.push(c.codeAfter);
          lines.push('```');
          lines.push('');
          lines.push('</details>');
          lines.push('');
        }

        lines.push('---');
        lines.push('');
      }
    }

    return lines.join('\n');
  }
}

// ─── Helpers ─────────────────────────────────────────────────
function priorityBadgeFor(p: 'P1' | 'P2' | 'P3'): string {
  if (p === 'P1') return '🔴 **P1**';
  if (p === 'P2') return '🟡 **P2**';
  return '🔵 **P3**';
}

function derivePriority(c: ReviewComment): 'P1' | 'P2' | 'P3' {
  if (c.severity === 'critical' || c.type === 'security') return 'P1';
  if (c.severity === 'warning' || c.type === 'bug' || c.type === 'performance') return 'P2';
  return 'P3';
}

function stripTrailingNewline(s: string): string {
  return s.replace(/\n+$/, '');
}

function normalize(s: string): string {
  return s.replace(/\r\n/g, '\n').replace(/[ \t]+\n/g, '\n').trim();
}

function encodeFilePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
