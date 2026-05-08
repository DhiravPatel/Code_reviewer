import { prisma } from '../config/db';
import { RepositoryService } from './repository.service';
import { GroqService } from './groq.service';
import { GithubService, InlineReviewComment } from './github.service';
import { buildAnchorIndex, snapToAnchor } from '../utils/diff-parser';

export class PrService {
  /**
   * Fetch open pull requests from GitHub for a specific enabled repo.
   */
  static async fetchPullRequests(accessToken: string, owner: string, repo: string) {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&per_page=30&sort=updated&direction=desc`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return (await response.json()) as any[];
  }

  /**
   * Fetch the diff/files for a specific pull request.
   */
  static async fetchPrFiles(accessToken: string, owner: string, repo: string, prNumber: number) {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return (await response.json()) as any[];
  }

  /**
   * Get a single PR detail from GitHub.
   */
  static async fetchPrDetail(accessToken: string, owner: string, repo: string, prNumber: number) {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeReview-App',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return (await response.json()) as any;
  }

  /**
   * List all PRs across all enabled repos — merges live open PRs from GitHub
   * with any PR reviews already stored in the DB (so merged/closed PRs stay visible).
   */
  static async listAllPullRequests(userId: string) {
    const enabledRepos = await RepositoryService.getEnabledRepos(userId);
    if (enabledRepos.length === 0) return [];

    const repoById = new Map(enabledRepos.map((r) => [r.id, r]));

    // 1) Fetch open PRs from GitHub (if GitHub is still connected)
    const accessToken = await RepositoryService.getAccessToken(userId);
    const livePrs: any[] = [];

    if (accessToken) {
      const results = await Promise.allSettled(
        enabledRepos.map(async (repo) => {
          const prs = await this.fetchPullRequests(accessToken, repo.owner, repo.name);
          return prs.map((pr: any) => ({
            id: pr.id,
            number: pr.number,
            title: pr.title,
            repoFullName: repo.fullName,
            repoName: repo.name,
            repoOwner: repo.owner,
            repoId: repo.id,
            author: pr.user?.login || 'unknown',
            authorAvatar: pr.user?.avatar_url || null,
            branch: pr.head?.ref || '',
            baseBranch: pr.base?.ref || '',
            additions: pr.additions || 0,
            deletions: pr.deletions || 0,
            changedFiles: pr.changed_files || 0,
            createdAt: pr.created_at,
            updatedAt: pr.updated_at,
            htmlUrl: pr.html_url,
            body: pr.body || '',
            state: pr.state || 'open',
          }));
        })
      );
      for (const result of results) {
        if (result.status === 'fulfilled') livePrs.push(...result.value);
      }
    }

    // 2) Fetch all DB-persisted reviews for this user (includes closed/merged PRs)
    const existingReviews = await prisma.prReview.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });

    // Key = "repoId:prNumber"
    const keyOf = (repoId: string, prNumber: number) => `${repoId}:${prNumber}`;

    // Map of review by key for quick lookup
    const reviewMap = new Map<string, any>();
    for (const r of existingReviews) {
      reviewMap.set(keyOf(r.repoId, r.prNumber), r);
    }

    // Set of live PR keys so we don't duplicate
    const liveKeys = new Set(livePrs.map((pr) => keyOf(pr.repoId, pr.number)));

    // 3) Merge: decorate live PRs with review data
    const merged: any[] = livePrs.map((pr) => {
      const review = reviewMap.get(keyOf(pr.repoId, pr.number));
      return {
        ...pr,
        reviewStatus: review?.status || null,
        reviewScore: review?.score ?? null,
        reviewVerdict: review?.verdict || null,
        reviewId: review?.id || null,
      };
    });

    // 4) Add DB-only reviews (for PRs that are merged/closed and no longer in the open list)
    for (const review of existingReviews) {
      const key = keyOf(review.repoId, review.prNumber);
      if (liveKeys.has(key)) continue;

      const repo = repoById.get(review.repoId);
      if (!repo) continue;

      merged.push({
        id: `db-${review.id}`,
        number: review.prNumber,
        title: review.prTitle,
        repoFullName: repo.fullName,
        repoName: repo.name,
        repoOwner: repo.owner,
        repoId: repo.id,
        author: review.prAuthor,
        authorAvatar: null,
        branch: review.prBranch,
        baseBranch: repo.defaultBranch,
        additions: review.additions,
        deletions: review.deletions,
        changedFiles: review.filesChanged,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        htmlUrl: `https://github.com/${repo.fullName}/pull/${review.prNumber}`,
        body: '',
        state: 'closed',
        reviewStatus: review.status,
        reviewScore: review.score ?? null,
        reviewVerdict: review.verdict,
        reviewId: review.id,
      });
    }

    // Sort by most recently updated
    merged.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return merged;
  }

  /**
   * Trigger an AI review from the dashboard (manual trigger).
   * Also posts/updates a comment on GitHub.
   */
  static async triggerReview(userId: string, repoId: string, prNumber: number) {
    return this.runReview(userId, repoId, prNumber, true);
  }

  /**
   * Trigger an AI review from a webhook (automatic).
   * Posts a loading comment on GitHub first, then updates it with results.
   */
  static async triggerReviewWithGithubComment(userId: string, repoId: string, prNumber: number) {
    return this.runReview(userId, repoId, prNumber, true);
  }

  /**
   * Core review logic — shared between manual and webhook triggers.
   */
  private static async runReview(userId: string, repoId: string, prNumber: number, postToGithub: boolean) {
    const repo = await prisma.enabledRepository.findUnique({
      where: { id: repoId },
    });
    if (!repo || repo.userId !== userId) {
      throw new Error('Repository not found or not owned by user');
    }

    const accessToken = await RepositoryService.getAccessToken(userId);
    if (!accessToken) throw new Error('GitHub not connected');

    // Fetch PR detail from GitHub
    const prDetail = await this.fetchPrDetail(accessToken, repo.owner, repo.name, prNumber);

    // Post a loading comment on GitHub first
    let githubCommentId: bigint | null = null;
    if (postToGithub) {
      try {
        githubCommentId = await GithubService.postLoadingComment(
          accessToken,
          repo.owner,
          repo.name,
          prNumber
        );
      } catch (err) {
        console.error('Failed to post loading comment to GitHub:', err);
        // Non-fatal — continue with the review
      }
    }

    // Create or update the review record as "reviewing"
    const review = await prisma.prReview.upsert({
      where: { repoId_prNumber: { repoId, prNumber } },
      update: {
        status: 'reviewing',
        prTitle: prDetail.title,
        prAuthor: prDetail.user?.login || 'unknown',
        prBranch: prDetail.head?.ref || '',
        additions: prDetail.additions || 0,
        deletions: prDetail.deletions || 0,
        filesChanged: prDetail.changed_files || 0,
        ...(githubCommentId ? { githubCommentId } : {}),
      },
      create: {
        userId,
        repoId,
        prNumber,
        prTitle: prDetail.title,
        prAuthor: prDetail.user?.login || 'unknown',
        prBranch: prDetail.head?.ref || '',
        additions: prDetail.additions || 0,
        deletions: prDetail.deletions || 0,
        filesChanged: prDetail.changed_files || 0,
        status: 'reviewing',
        ...(githubCommentId ? { githubCommentId } : {}),
      },
    });

    // Fetch the files/diff
    const files = await this.fetchPrFiles(accessToken, repo.owner, repo.name, prNumber);

    // Run AI review
    try {
      const aiResult = await GroqService.reviewPullRequest({
        prTitle: prDetail.title,
        prDescription: prDetail.body || '',
        files: files.map((f: any) => ({
          filename: f.filename,
          patch: f.patch || '',
          status: f.status,
        })),
        language: repo.language || undefined,
      });

      // ─── Inline review with ```suggestion blocks ─────────────────
      // Validate every AI comment against the actual diff hunks; only those
      // anchored to a commentable line can be posted inline. The rest still
      // appear in the summary issue-comment so nothing is lost.
      if (postToGithub) {
        const anchorIndex = buildAnchorIndex(
          files.map((f: any) => ({ filename: f.filename, patch: f.patch || '' }))
        );

        const inlineComments: InlineReviewComment[] = [];
        for (const c of aiResult.comments) {
          const snapped = snapToAnchor(anchorIndex, c.file, c.startLine, c.endLine);
          if (!snapped) continue;

          const useSuggestion = !!(c.codeAfter && c.codeAfter.trim());
          inlineComments.push({
            path: c.file,
            startLine: snapped.startLine,
            endLine: snapped.endLine,
            side: 'RIGHT',
            body: GithubService.buildInlineCommentBody(c, useSuggestion),
          });
        }

        // Clean up prior bot comments before posting new ones (re-run safety)
        try {
          await GithubService.deleteOurReviewComments(accessToken, repo.owner, repo.name, prNumber);
        } catch (err) {
          console.error('Failed to clean up prior inline comments:', err);
        }

        if (inlineComments.length > 0) {
          try {
            await GithubService.submitPrReview(
              accessToken,
              repo.owner,
              repo.name,
              prNumber,
              inlineComments
            );
          } catch (err) {
            console.error('Failed to submit inline PR review:', err);
          }
        }
      }

      // Update the GitHub summary comment with the full review
      const finalCommentId = githubCommentId || review.githubCommentId;
      if (postToGithub && finalCommentId) {
        try {
          await GithubService.updateComment(
            accessToken,
            repo.owner,
            repo.name,
            finalCommentId,
            aiResult
          );
        } catch (err) {
          console.error('Failed to update GitHub comment:', err);
        }
      } else if (postToGithub && !finalCommentId) {
        // No existing comment — post a fresh one
        try {
          const newCommentId = await GithubService.postReviewComment(
            accessToken,
            repo.owner,
            repo.name,
            prNumber,
            aiResult
          );
          githubCommentId = newCommentId;
        } catch (err) {
          console.error('Failed to post review comment to GitHub:', err);
        }
      }

      // Update the review with results
      const completedReview = await prisma.prReview.update({
        where: { id: review.id },
        data: {
          status: 'completed',
          score: aiResult.score,
          verdict: aiResult.verdict,
          summary: aiResult.summary as any,
          reviewComments: aiResult.comments as any,
          reviewedAt: new Date(),
          ...(githubCommentId ? { githubCommentId } : {}),
        },
      });

      return completedReview;
    } catch (error: any) {
      console.error('runReview failed:', {
        userId,
        repoId,
        prNumber,
        message: error?.message,
        status: error?.status,
        stack: error?.stack,
        error
      });

      // Mark as failed
      await prisma.prReview.update({
        where: { id: review.id },
        data: { status: 'failed' },
      });

      // Update GitHub comment with failure message if we posted one
      const failCommentId = githubCommentId || review.githubCommentId;
      if (postToGithub && failCommentId) {
        try {
          await GithubService.updateComment(
            accessToken,
            repo.owner,
            repo.name,
            failCommentId,
            {
              score: 0,
              verdict: 'changes_requested',
              overallFeedback: 'Review failed due to an internal error. Please trigger the review again.',
              comments: [],
              summary: { criticalIssues: 0, warnings: 0, suggestions: 0 },
            }
          );
        } catch (err) {
          console.error('Failed to update failure comment:', err);
        }
      }

      throw error;
    }
  }

  /**
   * Apply an AI-suggested fix by committing codeAfter directly to the PR's
   * head branch. Idempotent: refuses to re-apply an already-applied comment.
   * Refuses fork PRs (we don't have write access to forks).
   */
  static async applyFix(userId: string, reviewId: string, commentIndex: number) {
    const review = await prisma.prReview.findUnique({
      where: { id: reviewId },
      include: { repo: true },
    });
    if (!review || review.userId !== userId) {
      throw new Error('Review not found');
    }
    if (review.status !== 'completed') {
      throw new Error('Review is not completed yet');
    }

    const comments = Array.isArray(review.reviewComments) ? (review.reviewComments as any[]) : [];
    const comment = comments[commentIndex];
    if (!comment) throw new Error('Comment not found');
    if (comment.applied) throw new Error('Fix already applied');

    const codeAfter = String(comment.codeAfter || '');
    const codeBefore = String(comment.codeBefore || '');
    const file = String(comment.file || '');
    const startLine = comment.startLine ?? comment.line;
    const endLine = comment.endLine ?? comment.line ?? startLine;

    if (!codeAfter.trim()) throw new Error('Comment has no codeAfter to apply');
    if (!file) throw new Error('Comment has no target file');
    if (typeof startLine !== 'number' || typeof endLine !== 'number') {
      throw new Error('Comment has no target line numbers');
    }

    const accessToken = await RepositoryService.getAccessToken(userId);
    if (!accessToken) throw new Error('GitHub not connected');

    // Verify the PR isn't from a fork — we can only write to the same repo.
    const prDetail = await this.fetchPrDetail(accessToken, review.repo.owner, review.repo.name, review.prNumber);
    const headRepoFullName: string | undefined = prDetail.head?.repo?.full_name;
    const baseRepoFullName: string | undefined = prDetail.base?.repo?.full_name;
    if (headRepoFullName && baseRepoFullName && headRepoFullName !== baseRepoFullName) {
      throw new Error('Cannot apply fix: PR is from a fork. Apply the suggestion on GitHub instead.');
    }
    if (prDetail.state !== 'open') {
      throw new Error(`Cannot apply fix: PR is ${prDetail.state}.`);
    }

    const branch = prDetail.head?.ref || review.prBranch;
    const commitMessage = `Apply CodeReview AI fix: ${comment.title || 'suggested fix'}\n\nApplied from review ${reviewId} (comment #${commentIndex + 1}).`;

    const result = await GithubService.applyFileFix({
      accessToken,
      owner: review.repo.owner,
      repo: review.repo.name,
      branch,
      filePath: file,
      startLine,
      endLine,
      codeBefore,
      codeAfter,
      commitMessage,
    });

    // Persist applied state on the comment so the UI reflects it.
    const updatedComments = comments.map((c, i) =>
      i === commentIndex
        ? {
            ...c,
            applied: true,
            appliedAt: new Date().toISOString(),
            appliedCommitSha: result.commitSha,
            appliedCommitUrl: result.commitUrl,
          }
        : c
    );

    await prisma.prReview.update({
      where: { id: reviewId },
      data: { reviewComments: updatedComments as any },
    });

    return result;
  }

  /**
   * Get a specific review by ID.
   */
  static async getReview(reviewId: string, userId: string) {
    const review = await prisma.prReview.findUnique({
      where: { id: reviewId },
      include: { repo: true },
    });

    if (!review || review.userId !== userId) {
      return null;
    }

    return review;
  }

  /**
   * Get a review by repo + PR number.
   */
  static async getReviewByPr(repoId: string, prNumber: number, userId: string) {
    const review = await prisma.prReview.findUnique({
      where: { repoId_prNumber: { repoId, prNumber } },
      include: { repo: true },
    });

    if (!review || review.userId !== userId) {
      return null;
    }

    return review;
  }

  /**
   * Get all completed reviews for a user.
   */
  static async getUserReviews(userId: string) {
    return prisma.prReview.findMany({
      where: { userId },
      include: { repo: { select: { fullName: true, name: true, owner: true } } },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
