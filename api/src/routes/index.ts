import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './health.route';

export async function router(fastify: FastifyInstance) {
  fastify.register(healthRoutes, { prefix: '/health' });
  
  // Future routes example:
  // fastify.register(userRoutes, { prefix: '/users' });
  // fastify.register(reviewRoutes, { prefix: '/reviews' });
}
