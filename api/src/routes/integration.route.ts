import type { FastifyInstance } from 'fastify';
import { connectGithub, githubCallback } from '../controllers/integration.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function integrationRoutes(fastify: FastifyInstance) {
  // GET /api/v1/integrations/github/connect
  fastify.get('/github/connect', { preHandler: [authMiddleware] }, connectGithub);

  // GET /api/v1/integrations/github/callback
  fastify.get('/github/callback', { preHandler: [authMiddleware] }, githubCallback);
}
