import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrService } from '../services/pr.service';
import { successResponse, errorResponse } from '../utils/response';

/**
 * GET /api/v1/prs
 * List all open PRs across enabled repos.
 */
export const listPullRequests = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;
    const prs = await PrService.listAllPullRequests(authUser.id);

    return reply.status(200).send(successResponse({ prs }, 'Pull requests fetched'));
  } catch (error: any) {
    request.log.error(error, 'List PRs failed');
    const msg = error.message?.includes('not connected')
      ? 'GitHub not connected. Please connect GitHub first.'
      : 'Failed to fetch pull requests';
    return reply.status(500).send(errorResponse(msg, 500));
  }
};

/**
 * POST /api/v1/prs/review
 * Trigger an AI review for a specific PR.
 * Body: { repoId, prNumber }
 */
export const triggerReview = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;
    const body = request.body as any;

    if (!body.repoId || !body.prNumber) {
      return reply.code(400).send(errorResponse('Missing required fields: repoId, prNumber', 400));
    }

    const review = await PrService.triggerReview(authUser.id, body.repoId, body.prNumber);

    return reply.status(200).send(successResponse({ review }, 'AI review completed'));
  } catch (error: any) {
    request.log.error(error, 'Trigger review failed');
    return reply.status(500).send(errorResponse(error.message || 'Failed to run AI review', 500));
  }
};

/**
 * GET /api/v1/prs/review/:id
 * Get a specific review by its ID.
 */
export const getReview = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;
    const { id } = request.params as any;

    const review = await PrService.getReview(id, authUser.id);
    if (!review) {
      return reply.code(404).send(errorResponse('Review not found', 404));
    }

    return reply.status(200).send(successResponse({ review }, 'Review fetched'));
  } catch (error: any) {
    request.log.error(error, 'Get review failed');
    return reply.status(500).send(errorResponse('Failed to fetch review', 500));
  }
};

/**
 * GET /api/v1/prs/reviews
 * Get all reviews for the current user.
 */
export const listReviews = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authUser = request.user as any;
    const reviews = await PrService.getUserReviews(authUser.id);

    return reply.status(200).send(successResponse({ reviews }, 'Reviews fetched'));
  } catch (error: any) {
    request.log.error(error, 'List reviews failed');
    return reply.status(500).send(errorResponse('Failed to fetch reviews', 500));
  }
};
