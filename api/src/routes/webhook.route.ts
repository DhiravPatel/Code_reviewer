import type { FastifyInstance } from 'fastify';
import { handleGithubWebhook } from '../controllers/webhook.controller';

export async function webhookRoutes(fastify: FastifyInstance) {
  // POST /api/v1/webhooks/github — GitHub webhook receiver (no auth — verified by HMAC)
  fastify.post('/github', { config: { rawBody: true } }, handleGithubWebhook);
}
