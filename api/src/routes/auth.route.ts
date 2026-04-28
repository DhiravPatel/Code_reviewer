import type { FastifyInstance } from 'fastify';
import { googleStart, googleCallback, getMe, logout, refresh } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function authRoutes(fastify: FastifyInstance) {
  // GET /api/v1/auth/google — start Google OAuth flow
  fastify.get('/google', googleStart);

  // GET /api/v1/auth/google/callback — Google OAuth callback
  fastify.get('/google/callback', googleCallback);

  // POST /api/v1/auth/refresh — trade refresh token cookie for new access token
  fastify.post('/refresh', refresh);

  // GET /api/v1/auth/me — get current user profile
  fastify.get('/me', { preHandler: [authMiddleware] }, getMe);

  // POST /api/v1/auth/logout — logout
  fastify.post('/logout', logout);
}
