import type { FastifyRequest, FastifyReply } from 'fastify';
import crypto from 'crypto';
import { AuthService } from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/response';
import { env } from '../config/env';
import '@fastify/cookie';
import '@fastify/jwt';

// ─── Token Lifetimes ───────────────────────────────────────────
const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;          // 15 minutes
const REFRESH_TOKEN_TTL_SECONDS = 3 * 24 * 60 * 60; // 3 days

// ─── Cookie Helpers ────────────────────────────────────────────

/** Base cookie options — cross-site safe in production. */
function getBaseCookieOptions() {
  if (env.IS_PRODUCTION) {
    return {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'none' as const,
    };
  }
  return {
    path: '/',
    secure: false,
    httpOnly: true,
    sameSite: 'lax' as const,
  };
}

/** Short-lived access token cookie (15min). */
function getAccessCookieOptions() {
  return { ...getBaseCookieOptions(), maxAge: ACCESS_TOKEN_TTL_SECONDS };
}

/** Long-lived refresh token cookie (3 days). */
function getRefreshCookieOptions() {
  return { ...getBaseCookieOptions(), maxAge: REFRESH_TOKEN_TTL_SECONDS };
}

/** Short-lived OAuth CSRF state cookie. */
function getStateCookieOptions() {
  return { ...getBaseCookieOptions(), maxAge: 60 * 10 };
}

// ─── Token Helpers ─────────────────────────────────────────────

/**
 * Issue both access and refresh tokens for a user, set them as cookies.
 * Access token has type:'access', refresh has type:'refresh'.
 */
async function issueSessionCookies(
  reply: FastifyReply,
  user: { id: string; email: string }
): Promise<void> {
  const basePayload = { id: user.id, email: user.email };

  const accessToken = await reply.jwtSign(
    { ...basePayload, type: 'access' },
    { expiresIn: ACCESS_TOKEN_TTL_SECONDS }
  );

  const refreshToken = await reply.jwtSign(
    { ...basePayload, type: 'refresh' },
    { expiresIn: REFRESH_TOKEN_TTL_SECONDS }
  );

  reply.setCookie('token', accessToken, getAccessCookieOptions());
  reply.setCookie('refresh_token', refreshToken, getRefreshCookieOptions());
}

// ─── Routes ────────────────────────────────────────────────────

/**
 * GET /api/v1/auth/google
 * Start Google OAuth — generate state, set state cookie, redirect to Google.
 */
export const googleStart = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
      return reply.redirect(`${env.FRONTEND_URL}/login?error=oauth_not_configured`);
    }

    const state = crypto.randomBytes(32).toString('hex');
    reply.setCookie('g_oauth_state', state, getStateCookieOptions());

    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      access_type: 'online',
      prompt: 'select_account',
    });

    return reply.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  } catch (error) {
    console.error('Google OAuth start failed:', error);
    return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

/**
 * GET /api/v1/auth/google/callback
 */
export const googleCallback = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { code, state, error: googleError } = request.query as {
      code?: string;
      state?: string;
      error?: string;
    };

    if (googleError) {
      request.log.warn({ googleError }, 'Google returned an OAuth error');
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_denied`);
    }

    if (!code || !state) {
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_invalid_request`);
    }

    const cookieState = (request.cookies as any)?.g_oauth_state;
    if (!cookieState || cookieState !== state) {
      request.log.warn('Google state mismatch');
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_state_mismatch`);
    }

    reply.clearCookie('g_oauth_state', { path: '/' });

    // Exchange code for token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      request.log.error({ status: tokenResponse.status, errText }, 'Google token exchange failed');
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_token_exchange`);
    }

    const tokenData = (await tokenResponse.json()) as any;
    const accessToken = tokenData.access_token;
    if (!accessToken) {
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_no_token`);
    }

    // Fetch profile
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!profileResponse.ok) {
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_profile_fetch`);
    }

    const profile = (await profileResponse.json()) as any;
    if (!profile.email) {
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_no_email`);
    }

    const user = await AuthService.syncUser({
      email: profile.email,
      name: profile.name || profile.email.split('@')[0],
      avatarUrl: profile.picture || '',
      provider: 'google',
    });

    await issueSessionCookies(reply, { id: user.id, email: user.email });

    return reply.redirect(`${env.FRONTEND_URL}/dashboard/integrations`);
  } catch (error: any) {
    request.log.error({ err: error?.message, stack: error?.stack }, 'Google auth callback failed');
    return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

/**
 * POST /api/v1/auth/refresh
 * Trade a valid refresh_token cookie for a fresh access token cookie.
 * Returns 401 if the refresh token is missing/expired/invalid.
 */
export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const refreshToken = (request.cookies as any)?.refresh_token;
    if (!refreshToken) {
      return reply.code(401).send(errorResponse('No refresh token', 401));
    }

    let payload: any;
    try {
      payload = (request.server as any).jwt.verify(refreshToken);
    } catch (err) {
      request.log.warn('Invalid or expired refresh token');
      return reply.code(401).send(errorResponse('Refresh token invalid or expired', 401));
    }

    if (payload?.type !== 'refresh' || !payload.id || !payload.email) {
      return reply.code(401).send(errorResponse('Invalid refresh token payload', 401));
    }

    // Confirm the user still exists
    const user = await AuthService.getUserById(payload.id);
    if (!user) {
      return reply.code(401).send(errorResponse('User no longer exists', 401));
    }

    // Issue a new access token (rotate access only — keep the same refresh until expiry)
    const newAccessToken = await reply.jwtSign(
      { id: user.id, email: user.email, type: 'access' },
      { expiresIn: ACCESS_TOKEN_TTL_SECONDS }
    );
    reply.setCookie('token', newAccessToken, getAccessCookieOptions());

    return reply.status(200).send(successResponse({ refreshed: true }, 'Access token refreshed'));
  } catch (error) {
    request.log.error(error, 'Refresh failed');
    return reply.code(500).send(errorResponse('Refresh failed', 500));
  }
};

/**
 * GET /api/v1/auth/me
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
 */
export const logout = async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.clearCookie('token', getBaseCookieOptions());
  reply.clearCookie('refresh_token', getBaseCookieOptions());
  reply.clearCookie('g_oauth_state', { path: '/' });

  return reply.status(200).send(successResponse(null, 'Logged out successfully'));
};
