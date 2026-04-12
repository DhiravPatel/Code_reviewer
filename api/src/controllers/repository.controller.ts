import type { FastifyRequest, FastifyReply } from 'fastify';
import { RepositoryService } from '../services/repository.service';
import { successResponse, errorResponse } from '../utils/response';

/**
 * GET /api/v1/repos
 * Lists all GitHub repos from the user's connected account,
 * plus marks which ones are enabled for AI review.
 */
export const listRepos = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;

    // Get access token
    const accessToken = await RepositoryService.getAccessToken(authUser.id);
    if (!accessToken) {
      return reply.code(400).send(
        errorResponse('GitHub not connected. Please connect GitHub first.', 400)
      );
    }

    // Fetch repos from GitHub API
    const githubRepos = await RepositoryService.fetchGithubRepos(accessToken);

    // Get enabled repos from our DB
    const enabledRepos = await RepositoryService.getEnabledRepos(authUser.id);
    const enabledRepoIds = new Set(enabledRepos.map((r) => r.githubRepoId));

    // Merge: mark each GitHub repo as enabled or not
    const repos = githubRepos.map((repo) => ({
      ...repo,
      enabled: enabledRepoIds.has(repo.githubRepoId),
    }));

    return reply.status(200).send(
      successResponse({
        repos,
        enabledCount: enabledRepos.length,
        maxEnabled: 5,
      }, 'Repositories fetched')
    );
  } catch (error: any) {
    request.log.error(error, 'List repos failed');
    return reply.status(500).send(errorResponse(error.message || 'Failed to fetch repositories', 500));
  }
};

/**
 * POST /api/v1/repos/enable
 * Enable a repository for AI code review (max 5).
 */
export const enableRepo = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;
    const body = request.body as any;

    if (!body.githubRepoId || !body.fullName || !body.name || !body.owner) {
      return reply.code(400).send(errorResponse('Missing required fields: githubRepoId, fullName, name, owner', 400));
    }

    const repo = await RepositoryService.enableRepo(authUser.id, {
      githubRepoId: body.githubRepoId,
      fullName: body.fullName,
      name: body.name,
      owner: body.owner,
      language: body.language || null,
      description: body.description || null,
      isPrivate: body.isPrivate || false,
      defaultBranch: body.defaultBranch || 'main',
    });

    return reply.status(200).send(successResponse({ repo }, 'Repository enabled for AI review'));
  } catch (error: any) {
    request.log.error(error, 'Enable repo failed');
    const status = error.message?.includes('Maximum') ? 400 : 500;
    return reply.status(status).send(errorResponse(error.message || 'Failed to enable repository', status));
  }
};

/**
 * POST /api/v1/repos/disable
 * Disable a repository from AI code review.
 */
export const disableRepo = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;
    const body = request.body as any;

    if (!body.githubRepoId) {
      return reply.code(400).send(errorResponse('Missing required field: githubRepoId', 400));
    }

    const result = await RepositoryService.disableRepo(authUser.id, body.githubRepoId);

    if (!result) {
      return reply.code(404).send(errorResponse('Repository not found in enabled list', 404));
    }

    return reply.status(200).send(successResponse(null, 'Repository disabled'));
  } catch (error: any) {
    request.log.error(error, 'Disable repo failed');
    return reply.status(500).send(errorResponse('Failed to disable repository', 500));
  }
};
