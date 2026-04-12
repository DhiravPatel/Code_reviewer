import type { FastifyInstance } from 'fastify';
import { connectGithub, githubCallback, disconnectGithub } from '../controllers/integration.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function integrationRoutes(fastify: FastifyInstance) {
  // GET /api/v1/integrations/github/connect — initiate GitHub OAuth (requires auth)
  fastify.get('/github/connect', { preHandler: [authMiddleware] }, connectGithub);

  // GET /api/v1/integrations/github/callback — GitHub OAuth callback (NO auth middleware)
  fastify.get('/github/callback', githubCallback);

  // DELETE /api/v1/integrations/github/disconnect — remove GitHub integration (requires auth)
  fastify.delete('/github/disconnect', { preHandler: [authMiddleware] }, disconnectGithub);
}
