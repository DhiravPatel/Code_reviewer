import Fastify from 'fastify';
import cors from '@fastify/cors';
import { router } from './routes';
import { env } from './config/env';

export const buildApp = async () => {
  const fastify = Fastify({
    logger: true,
  });

  // Register CORS — allow the frontend origin
  await fastify.register(cors, {
    origin: env.IS_PRODUCTION
      ? [env.FRONTEND_URL]
      : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Register cookie and JWT plugins
  await fastify.register(require('@fastify/cookie'), {
    secret: env.JWT_SECRET,
  });

  await fastify.register(require('@fastify/jwt'), {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  // Register Google OAuth2
  await fastify.register(require('@fastify/oauth2'), {
    name: 'googleOAuth2',
    credentials: {
      client: {
        id: env.GOOGLE_CLIENT_ID,
        secret: env.GOOGLE_CLIENT_SECRET,
      },
      auth: require('@fastify/oauth2').GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/api/v1/auth/google',
    callbackUri: env.GOOGLE_REDIRECT_URI,
    scope: ['profile', 'email'],
  });

  // NOTE: GitHub OAuth is handled manually in integration.controller.ts
  // because the callback redirect from github.com won't carry our JWT cookie.
  // We use a custom state token to identify the user instead.

  // Default root route
  fastify.get('/', async () => {
    return { status: 'CodeReview API is running.' };
  });

  // Register API Routes under /api/v1
  fastify.register(router, { prefix: '/api/v1' });

  return fastify;
};
