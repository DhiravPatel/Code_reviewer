import type { FastifyRequest, FastifyReply } from 'fastify';
import { HealthService } from '../services/health.service';
import { successResponse, errorResponse } from '../utils/response';

export const getHealthStatus = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const isDbConnected = await HealthService.checkDatabase();
    
    const dbStatus = isDbConnected ? 'connected' : 'disconnected';
    
    const memoryUsage = process.memoryUsage();
    
    return reply.status(200).send(successResponse({
      status: 'UP',
      env: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: dbStatus,
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
      }
    }, 'Server is running perfectly'));
  } catch (error) {
    return reply.status(500).send(errorResponse('Failed to get health status', 500, error));
  }
};
