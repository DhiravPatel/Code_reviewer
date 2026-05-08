import type { FastifyInstance } from 'fastify';
import { listPullRequests, triggerReview, getReview, listReviews, applyFix } from '../controllers/pr.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function prRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', authMiddleware);

  // GET /api/v1/prs — list all open PRs across enabled repos
  fastify.get('/', listPullRequests);

  // POST /api/v1/prs/review — trigger AI review for a PR
  fastify.post('/review', triggerReview);

  // GET /api/v1/prs/reviews — list all user's reviews
  fastify.get('/reviews', listReviews);

  // GET /api/v1/prs/review/:id — get a specific review
  fastify.get('/review/:id', getReview);

  // POST /api/v1/prs/review/:id/apply-fix — apply an AI fix to the PR branch
  fastify.post('/review/:id/apply-fix', applyFix);
}
