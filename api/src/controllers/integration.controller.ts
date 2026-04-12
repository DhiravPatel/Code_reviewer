import type { FastifyRequest, FastifyReply } from 'fastify';
import { IntegrationService } from '../services/integration.service';
import { errorResponse, successResponse } from '../utils/response';
import { env } from '../config/env';
import crypto from 'crypto';

/**
 * In-memory store for GitHub OAuth state tokens.
 * Maps: stateToken -> { userId, createdAt }
 * In production, use Redis or a DB table instead.
 */
const pendingStates = new Map<string, { userId: string; createdAt: number }>();

// Clean up expired states every 5 minutes (states expire after 10 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of pendingStates) {
    if (now - val.createdAt > 10 * 60 * 1000) {
      pendingStates.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * GET /api/v1/integrations/github/connect
 * Initiates the GitHub OAuth flow. Requires authentication (JWT cookie).
 * We encode the userId in a state token so the callback can identify the user
 * without relying on cookies (browser won't send cookies on the redirect from GitHub).
 */
export const connectGithub = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;
    if (!authUser?.id) {
      return reply.code(401).send(errorResponse('Not authenticated', 401));
    }

    // Check if already connected
    const existing = await IntegrationService.getGithubIntegration(authUser.id);
    if (existing) {
      return reply.redirect(`${env.FRONTEND_URL}/dashboard/integrations?github=already_connected`);
    }

    // Generate a secure random state token and store the userId
    const stateToken = crypto.randomBytes(32).toString('hex');
    pendingStates.set(stateToken, { userId: authUser.id, createdAt: Date.now() });

    // Build the GitHub authorization URL with our custom state
    const params = new URLSearchParams({
      client_id: env.GITHUB_CLIENT_ID,
      redirect_uri: env.GITHUB_REDIRECT_URI,
      scope: 'repo user:email read:user',
      state: stateToken,
    });

    return reply.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
  } catch (error) {
    request.log.error(error, 'GitHub connect failed');
    return reply.redirect(`${env.FRONTEND_URL}/dashboard/integrations?error=github_connect_failed`);
  }
};

/**
 * GET /api/v1/integrations/github/callback
 * Handles the OAuth callback from GitHub.
 * NO auth middleware — the browser is redirecting from github.com so cookies won't be present.
 * Instead we verify the state token to identify the user.
 */
export const githubCallback = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { code, state } = request.query as { code?: string; state?: string };

    if (!code || !state) {
      return reply.redirect(`${env.FRONTEND_URL}/dashboard/integrations?error=github_missing_params`);
    }

    // Verify the state token and get the userId
    const pending = pendingStates.get(state);
    if (!pending) {
      return reply.redirect(`${env.FRONTEND_URL}/dashboard/integrations?error=github_invalid_state`);
    }

    // Check if state is expired (10 minute window)
    if (Date.now() - pending.createdAt > 10 * 60 * 1000) {
      pendingStates.delete(state);
      return reply.redirect(`${env.FRONTEND_URL}/dashboard/integrations?error=github_state_expired`);
    }

    const userId = pending.userId;
    pendingStates.delete(state); // One-time use

    // Exchange the code for an access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: env.GITHUB_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange GitHub code for token');
    }

    const tokenData = (await tokenResponse.json()) as any;

    if (tokenData.error) {
      throw new Error(`GitHub token error: ${tokenData.error_description || tokenData.error}`);
    }

    const accessToken = tokenData.access_token;

    // Get the GitHub user profile
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'CodeReview-App',
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch GitHub user profile');
    }

    const githubUser = (await profileResponse.json()) as any;

    // Save the integration
    await IntegrationService.saveGithubIntegration({
      userId,
      githubId: githubUser.id,
      username: githubUser.login,
      accessToken,
      avatarUrl: githubUser.avatar_url || null,
    });

    return reply.redirect(`${env.FRONTEND_URL}/dashboard/integrations?github=connected`);
  } catch (error) {
    request.log.error(error, 'GitHub callback failed');
    return reply.redirect(`${env.FRONTEND_URL}/dashboard/integrations?error=github_connect_failed`);
  }
};

/**
 * DELETE /api/v1/integrations/github/disconnect
 * Removes the GitHub integration for the authenticated user.
 */
export const disconnectGithub = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;
    if (!authUser?.id) {
      return reply.code(401).send(errorResponse('Not authenticated', 401));
    }

    await IntegrationService.deleteGithubIntegration(authUser.id);

    return reply.status(200).send(successResponse(null, 'GitHub disconnected successfully'));
  } catch (error) {
    request.log.error(error, 'GitHub disconnect failed');
    return reply.status(500).send(errorResponse('Failed to disconnect GitHub', 500));
  }
};
