import type { FastifyRequest, FastifyReply } from 'fastify';
import { IntegrationService } from '../services/integration.service';
import { errorResponse } from '../utils/response';
import { env } from '../config/env';

/**
 * GET /api/v1/integrations/github/connect
 * Initiate GitHub OAuth flow.
 * Must be called with a user session (JWT).
 */
export const connectGithub = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const oauth2 = (request.server as any).githubOAuth2;
    if (!oauth2) {
      return reply.code(500).send(errorResponse('GitHub OAuth not configured', 500));
    }
    const authUrl = await oauth2.generateAuthorizationUri(request, reply);
    return reply.redirect(authUrl);
  } catch (error) {
    request.log.error(error, 'GitHub connect failed');
    return reply.status(500).send(errorResponse('Failed to initialize GitHub connection', 500));
  }
};

/**
 * GET /api/v1/integrations/github/callback
 * Handle successful authentication from GitHub.
 */
export const githubCallback = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const oauth2 = (request.server as any).githubOAuth2;
    const { token } = await oauth2.getAccessTokenFromAuthorizationCodeFlow(request);
    
    // Get GitHub Profile using the accessToken
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        'User-Agent': 'CodeReview-App'
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch github user profile');
    }
    
    const githubUser = await profileResponse.json() as any;

    const authUser = request.user as any;
    if (!authUser || !authUser.id) {
       return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_failed_github_callback`);
    }

    // Save in DB
    await IntegrationService.saveGithubIntegration({
      userId: authUser.id,
      githubId: githubUser.id,
      username: githubUser.login,
      accessToken: token.access_token,
    });

    return reply.redirect(`${env.FRONTEND_URL}/dashboard?github=connected`);
  } catch (error) {
    request.log.error(error, 'GitHub callback failed');
    return reply.redirect(`${env.FRONTEND_URL}/dashboard?error=github_connect_failed`);
  }
};
