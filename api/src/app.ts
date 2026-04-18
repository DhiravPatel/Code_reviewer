import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastifyRawBody from 'fastify-raw-body';
import { router } from './routes';
import { env } from './config/env';

export const buildApp = async () => {
  const fastify = Fastify({
    logger: true,
  });

  // Register CORS
  await fastify.register(cors, {
    origin: env.IS_PRODUCTION
      ? [env.FRONTEND_URL]
      : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Add rawBody support for webhook signature verification
  await fastify.register(fastifyRawBody, {
    field: 'rawBody',
    global: false,
    runFirst: true,
  });

  // Register cookie and JWT plugins
  await fastify.register(fastifyCookie, {
    secret: env.JWT_SECRET,
  });

  await fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    fastify.log.warn('Google OAuth is disabled: GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET is missing.');
  }

  // Convert BigInt values to strings before JSON serialization
  fastify.addHook('preSerialization', async (_request, _reply, payload) => {
    return JSON.parse(JSON.stringify(payload, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  });

  // Default root route
  fastify.get('/', async () => {
    return { status: 'CodeReview API is running.' };
  });

  // Register API Routes under /api/v1
  fastify.register(router, { prefix: '/api/v1' });

  return fastify;
};
