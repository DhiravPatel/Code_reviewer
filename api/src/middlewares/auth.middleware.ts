import type { FastifyRequest, FastifyReply } from 'fastify';
import { errorResponse } from '../utils/response';
import '@fastify/jwt';

/**
 * Verifies the access JWT from the `token` cookie.
 * Rejects refresh tokens (those have type:'refresh' and must use /auth/refresh).
 */
export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
    const payload = request.user as any;

    // Reject if this is a refresh token being used as an access token
    // (legacy tokens without `type` are accepted as access for backward compat)
    if (payload && payload.type && payload.type !== 'access') {
      return reply.code(401).send(errorResponse('Invalid token type', 401));
    }
  } catch (err) {
    return reply.code(401).send(errorResponse('Authentication failed', 401));
  }
};
