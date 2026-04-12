import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './health.route';
import { authRoutes } from './auth.route';
import { integrationRoutes } from './integration.route';
import { repoRoutes } from './repository.route';
import { prRoutes } from './pr.route';
import { webhookRoutes } from './webhook.route';

export async function router(fastify: FastifyInstance) {
  fastify.register(healthRoutes, { prefix: '/health' });
  fastify.register(authRoutes, { prefix: '/auth' });
  fastify.register(integrationRoutes, { prefix: '/integrations' });
  fastify.register(repoRoutes, { prefix: '/repos' });
  fastify.register(prRoutes, { prefix: '/prs' });
  fastify.register(webhookRoutes, { prefix: '/webhooks' });
}
