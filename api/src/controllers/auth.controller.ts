import type { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/response';
import { env } from '../config/env';
import '@fastify/cookie';
import '@fastify/jwt';

/** Shared cookie options — single source of truth */
function getCookieOptions() {
  return {
    path: '/',
    secure: env.IS_PRODUCTION,
    httpOnly: true,
    sameSite: 'lax' as const,
    ...(env.IS_PRODUCTION && env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
  };
}

/**
 * GET /api/v1/auth/google/callback
 * Google redirects here after successful auth. We fetch the token, get the profile, sync user, set a cookie and redirect.
 */
export const googleCallback = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const oauth2 = (request.server as any).googleOAuth2;
    const { token } = await oauth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch Google user profile');
    }

    const profile = (await profileResponse.json()) as any;

    const user = await AuthService.syncUser({
      email: profile.email,
      name: profile.name,
      avatarUrl: profile.picture,
      provider: 'google',
    });

    const jwtPayload = { id: user.id, email: user.email };
    const signedToken = await reply.jwtSign(jwtPayload);

    reply.setCookie('token', signedToken, {
      ...getCookieOptions(),
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return reply.redirect(`${env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    request.log.error(error, 'Google auth callback failed');
    return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

/**
 * GET /api/v1/auth/me
 * Returns the currently authenticated user's profile + github integration status.
 */
export const getMe = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;

    if (!authUser?.id) {
      return reply.code(401).send(errorResponse('Not authenticated', 401));
    }

    const user = await AuthService.getUserWithIntegrations(authUser.id);

    if (!user) {
      return reply.code(404).send(errorResponse('User not found', 404));
    }

    // Build a safe response — never expose access tokens to the frontend
    const response = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      provider: user.provider,
      createdAt: user.createdAt,
      githubConnected: !!user.githubIntegration,
      githubUsername: user.githubIntegration?.username || null,
      githubAvatarUrl: user.githubIntegration?.avatarUrl || null,
    };

    return reply.status(200).send(successResponse({ user: response }, 'User profile retrieved'));
  } catch (error) {
    request.log.error(error, 'Get me failed');
    return reply.status(500).send(errorResponse('Failed to get user profile', 500));
  }
};

/**
 * POST /api/v1/auth/logout
 * Clears the session cookie.
 */
export const logout = async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.clearCookie('token', getCookieOptions());
  reply.clearCookie('oauth2-redirect-state', { path: '/' });

  return reply.status(200).send(successResponse(null, 'Logged out successfully'));
};
