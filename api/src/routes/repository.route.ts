import type { FastifyInstance } from 'fastify';
import { listRepos, enableRepo, disableRepo } from '../controllers/repository.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function repoRoutes(fastify: FastifyInstance) {
  // All repo routes require authentication
  fastify.addHook('preHandler', authMiddleware);

  // GET /api/v1/repos — list all GitHub repos with enabled status
  fastify.get('/', listRepos);

  // POST /api/v1/repos/enable — enable a repo for AI review
  fastify.post('/enable', enableRepo);

  // POST /api/v1/repos/disable — disable a repo from AI review
  fastify.post('/disable', disableRepo);
}
