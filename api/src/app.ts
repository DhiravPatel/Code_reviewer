import Fastify from 'fastify';
import cors from '@fastify/cors';
import { router } from './routes';

export const buildApp = async () => {
  const fastify = Fastify({
    logger: true,
  });

  // Register Middlewares
  await fastify.register(cors, {
    origin: '*', // In production, this should be restricted
  });

  // Default root route
  fastify.get('/', async () => {
    return { status: 'CodeReview API is running.' };
  });

  // Register API Routes under /api/v1
  fastify.register(router, { prefix: '/api/v1' });

  return fastify;
};
