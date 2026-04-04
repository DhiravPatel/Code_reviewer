import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './health.route';
import { authRoutes } from './auth.route';
import { integrationRoutes } from './integration.route';

export async function router(fastify: FastifyInstance) {
  fastify.register(healthRoutes, { prefix: '/health' });
  fastify.register(authRoutes, { prefix: '/auth' });
  fastify.register(integrationRoutes, { prefix: '/integrations' });
  
  // Future routes example:
  // fastify.register(userRoutes, { prefix: '/users' });
  // fastify.register(reviewRoutes, { prefix: '/reviews' });
}
