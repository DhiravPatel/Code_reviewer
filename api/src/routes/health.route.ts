import type { FastifyInstance } from 'fastify';
import { getHealthStatus } from '../controllers/health.controller';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/', getHealthStatus);
}
