import { prisma } from '../config/db';
import { RepositoryService } from './repository.service';
import { GroqService } from './groq.service';
import { GithubService } from './github.service';

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
   * List all open PRs across all enabled repos for a user.
   */
  static async listAllPullRequests(userId: string) {
    const accessToken = await RepositoryService.getAccessToken(userId);
    if (!accessToken) throw new Error('GitHub not connected');

    const enabledRepos = await RepositoryService.getEnabledRepos(userId);
    if (enabledRepos.length === 0) return [];

    // Fetch PRs from all enabled repos in parallel
    const allPrs: any[] = [];
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
        }));
      })
    );

    for (const result of results) {
      if (result.status === 'fulfilled') {
        allPrs.push(...result.value);
      }
    }

    // Sort by updated date (most recent first)
    allPrs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // Check which PRs already have reviews in our DB
    const existingReviews = await prisma.prReview.findMany({
      where: { userId },
      select: { repoId: true, prNumber: true, status: true, score: true, verdict: true, id: true },
    });

    const reviewMap = new Map<string, any>();
    for (const r of existingReviews) {
      reviewMap.set(`${r.repoId}:${r.prNumber}`, r);
    }

    return allPrs.map((pr) => {
      const review = reviewMap.get(`${pr.repoId}:${pr.number}`);
      return {
        ...pr,
        reviewStatus: review?.status || null,
        reviewScore: review?.score || null,
        reviewVerdict: review?.verdict || null,
        reviewId: review?.id || null,
      };
    });
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

      // Update the GitHub comment with the full review
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
