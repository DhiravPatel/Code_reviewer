import { prisma } from '../config/db';
import { GithubService } from './github.service';

const MAX_ENABLED_REPOS = 5;

export class RepositoryService {
  /**
   * Fetch all repositories from the user's connected GitHub account.
   */
  static async fetchGithubRepos(accessToken: string) {
    const repos: any[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const response = await fetch(
        `https://api.github.com/user/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'User-Agent': 'CodeReview-App',
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as any[];
      if (data.length === 0) break;

      repos.push(...data);
      if (data.length < perPage) break;
      page++;
    }

    return repos.map((repo) => ({
      githubRepoId: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      owner: repo.owner.login,
      description: repo.description,
      language: repo.language,
      isPrivate: repo.private,
      defaultBranch: repo.default_branch,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      updatedAt: repo.updated_at,
      htmlUrl: repo.html_url,
    }));
  }

  /**
   * Get the user's GitHub access token from their integration.
   */
  static async getAccessToken(userId: string): Promise<string | null> {
    const integration = await prisma.githubIntegration.findUnique({
      where: { userId },
      select: { accessToken: true },
    });
    return integration?.accessToken || null;
  }

  /**
   * Get all enabled repositories for a user.
   */
  static async getEnabledRepos(userId: string) {
    return prisma.enabledRepository.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Enable a repository for AI code review.
   * Also registers a webhook on the repo to auto-review PRs.
   */
  static async enableRepo(userId: string, repoData: {
    githubRepoId: number;
    fullName: string;
    name: string;
    owner: string;
    language: string | null;
    description: string | null;
    isPrivate: boolean;
    defaultBranch: string;
  }) {
    // Check current count
    const count = await prisma.enabledRepository.count({ where: { userId } });
    if (count >= MAX_ENABLED_REPOS) {
      throw new Error(`Maximum of ${MAX_ENABLED_REPOS} repositories can be enabled. Please disable one first.`);
    }

    // Get access token for webhook registration
    const accessToken = await this.getAccessToken(userId);

    // Register webhook on the GitHub repo
    let webhookId: number | null = null;
    if (accessToken) {
      try {
        webhookId = await GithubService.createWebhook(
          accessToken,
          repoData.owner,
          repoData.name
        );
      } catch (err) {
        console.error('Failed to create webhook (continuing without it):', err);
        // Non-fatal — repo can still be enabled, user can trigger reviews manually
      }
    }

    // Upsert to handle re-enabling
    return prisma.enabledRepository.upsert({
      where: {
        userId_githubRepoId: {
          userId,
          githubRepoId: repoData.githubRepoId,
        },
      },
      update: {
        fullName: repoData.fullName,
        name: repoData.name,
        owner: repoData.owner,
        language: repoData.language,
        description: repoData.description,
        isPrivate: repoData.isPrivate,
        defaultBranch: repoData.defaultBranch,
        ...(webhookId ? { webhookId } : {}),
      },
      create: {
        userId,
        ...repoData,
        ...(webhookId ? { webhookId } : {}),
      },
    });
  }

  /**
   * Disable a repository (remove from enabled list).
   * Also removes the webhook from GitHub.
   */
  static async disableRepo(userId: string, githubRepoId: number) {
    const existing = await prisma.enabledRepository.findUnique({
      where: {
        userId_githubRepoId: { userId, githubRepoId },
      },
    });
    if (!existing) return null;

    // Remove webhook from GitHub
    if (existing.webhookId) {
      const accessToken = await this.getAccessToken(userId);
      if (accessToken) {
        try {
          await GithubService.deleteWebhook(
            accessToken,
            existing.owner,
            existing.name,
            existing.webhookId
          );
        } catch (err) {
          console.error('Failed to delete webhook (continuing):', err);
        }
      }
    }

    await prisma.enabledRepository.delete({
      where: { id: existing.id },
    });
    return existing;
  }
}
