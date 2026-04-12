import { env } from '../config/env';

interface ReviewComment {
  type: string;
  severity: string;
  title: string;
  description: string;
  file: string;
  line: number | null;
  details: string[];
}

interface ReviewData {
  score: number;
  verdict: string;
  overallFeedback: string;
  comments: ReviewComment[];
  summary: { criticalIssues: number; warnings: number; suggestions: number };
}

export class GithubService {
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

  // ─── Comment Body Formatting ───────────────────────────────────

  private static buildLoadingCommentBody(): string {
    return [
      '## <img src="https://img.icons8.com/fluency/24/artificial-intelligence.png" width="20" /> CodeReview AI',
      '',
      '> **Analyzing your pull request...** This usually takes 15–30 seconds.',
      '',
      '---',
      '_Powered by [CodeReview AI](https://github.com) — Automated code review with Groq AI_',
    ].join('\n');
  }

  private static buildReviewCommentBody(review: ReviewData): string {
    const scoreEmoji = review.score >= 80 ? '🟢' : review.score >= 60 ? '🟡' : '🔴';
    const verdictText = review.verdict === 'approved' ? '✅ Approved' : '⚠️ Changes Requested';

    const lines: string[] = [
      '## <img src="https://img.icons8.com/fluency/24/artificial-intelligence.png" width="20" /> CodeReview AI',
      '',
      `> ${review.overallFeedback || 'Review completed.'}`,
      '',
      '### Summary',
      '',
      `| Metric | Value |`,
      `|--------|-------|`,
      `| **Score** | ${scoreEmoji} **${review.score}/100** |`,
      `| **Verdict** | ${verdictText} |`,
      `| **Critical Issues** | ${review.summary.criticalIssues} |`,
      `| **Warnings** | ${review.summary.warnings} |`,
      `| **Suggestions** | ${review.summary.suggestions} |`,
      '',
    ];

    if (review.comments.length > 0) {
      lines.push('### Review Comments', '');

      for (const comment of review.comments) {
        const icon = comment.type === 'security' ? '🔴' : comment.type === 'warning' ? '🟡' : '🔵';
        const severity = comment.severity === 'critical' ? '**CRITICAL**' : comment.severity === 'warning' ? '**WARNING**' : 'info';
        const fileRef = comment.file ? `\`${comment.file}${comment.line ? `:${comment.line}` : ''}\`` : '';

        lines.push(`#### ${icon} ${comment.title} ${fileRef ? `— ${fileRef}` : ''}`);
        lines.push(`> ${severity}`);
        lines.push('');
        lines.push(comment.description);

        if (comment.details && comment.details.length > 0) {
          lines.push('');
          for (const detail of comment.details) {
            lines.push(`- ${detail}`);
          }
        }
        lines.push('');
      }
    }

    lines.push('---');
    lines.push('_Powered by [CodeReview AI](https://github.com) — Automated code review with Groq AI_');

    return lines.join('\n');
  }
}
