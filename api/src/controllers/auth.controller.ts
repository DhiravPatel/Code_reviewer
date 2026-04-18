import type { FastifyRequest, FastifyReply } from 'fastify';
import crypto from 'crypto';
import { AuthService } from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/response';
import { env } from '../config/env';
import '@fastify/cookie';
import '@fastify/jwt';

/**
 * Shared cookie options for the session `token` cookie.
 *
 * In production the frontend and backend are on different domains
 * (e.g. code-reviewer07.vercel.app and code-reviewer-backend07.vercel.app),
 * so we need sameSite:'none' + secure:true for the browser to send the cookie
 * on cross-site requests.
 */
function getSessionCookieOptions() {
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

/** Short-lived state cookie for OAuth CSRF protection */
function getStateCookieOptions() {
  return {
    ...getSessionCookieOptions(),
    maxAge: 60 * 10, // 10 minutes
  };
}

/**
 * GET /api/v1/auth/google
 * Start Google OAuth — generate state, set state cookie, redirect to Google.
 */
export const googleStart = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
      return reply.redirect(`${env.FRONTEND_URL}/login?error=oauth_not_configured`);
    }

    // CSRF state token stored in a cookie and echoed in the redirect
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
 * Google redirects here after the user grants consent. We verify state, exchange
 * the code for an access token, fetch the user profile, upsert the user, and
 * issue a JWT session cookie before redirecting to the dashboard.
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
      request.log.warn('Google callback missing code or state');
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_invalid_request`);
    }

    // Verify state cookie matches the state in the query
    const cookieState = (request.cookies as any)?.g_oauth_state;
    if (!cookieState || cookieState !== state) {
      request.log.warn({ cookieState, state }, 'Google state mismatch');
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_state_mismatch`);
    }

    // Clear the state cookie — one-time use
    reply.clearCookie('g_oauth_state', { path: '/' });

    // Exchange authorization code for an access token
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
      request.log.error({ tokenData }, 'Google token response missing access_token');
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_no_token`);
    }

    // Fetch user profile from Google
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!profileResponse.ok) {
      request.log.error({ status: profileResponse.status }, 'Failed to fetch Google user profile');
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_profile_fetch`);
    }

    const profile = (await profileResponse.json()) as any;

    if (!profile.email) {
      request.log.error({ profile }, 'Google profile missing email');
      return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_no_email`);
    }

    // Upsert user in database
    const user = await AuthService.syncUser({
      email: profile.email,
      name: profile.name || profile.email.split('@')[0],
      avatarUrl: profile.picture || '',
      provider: 'google',
    });

    // Create JWT session token
    const jwtPayload = { id: user.id, email: user.email };
    const signedToken = await reply.jwtSign(jwtPayload);

    // Set session cookie (cross-site in production)
    reply.setCookie('token', signedToken, {
      ...getSessionCookieOptions(),
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return reply.redirect(`${env.FRONTEND_URL}/dashboard`);
  } catch (error: any) {
    request.log.error({ err: error?.message, stack: error?.stack }, 'Google auth callback failed');
    return reply.redirect(`${env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

/**
 * GET /api/v1/auth/me
 * Returns the currently authenticated user's profile + GitHub integration status.
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
  reply.clearCookie('token', getSessionCookieOptions());
  reply.clearCookie('g_oauth_state', { path: '/' });

  return reply.status(200).send(successResponse(null, 'Logged out successfully'));
};
