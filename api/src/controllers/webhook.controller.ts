import type { FastifyRequest, FastifyReply } from 'fastify';
import crypto from 'crypto';
import { prisma } from '../config/db';
import { env } from '../config/env';
import { PrService } from '../services/pr.service';

/**
 * POST /api/v1/webhooks/github
 * Receives GitHub webhook events. No JWT auth — verified by HMAC signature.
 */
export const handleGithubWebhook = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const event = request.headers['x-github-event'] as string;
    const signature = request.headers['x-hub-signature-256'] as string;
    const deliveryId = request.headers['x-github-delivery'] as string;

    // Verify webhook signature using the raw body
    const rawBody = (request as any).rawBody || JSON.stringify(request.body);
    if (!verifySignature(rawBody, signature)) {
      request.log.warn({ deliveryId }, 'Invalid webhook signature');
      return reply.code(401).send({ error: 'Invalid signature' });
    }

    // We only care about pull_request events
    if (event !== 'pull_request') {
      return reply.code(200).send({ message: `Ignored event: ${event}` });
    }

    const payload = request.body as any;
    const action = payload.action;

    // Only trigger review on PR opened or synchronized (new commits pushed)
    if (action !== 'opened' && action !== 'synchronize') {
      return reply.code(200).send({ message: `Ignored action: ${action}` });
    }

    const prNumber = payload.pull_request?.number;
    const repoFullName = payload.repository?.full_name;
    const githubRepoId = payload.repository?.id;

    if (!prNumber || !repoFullName || !githubRepoId) {
      return reply.code(400).send({ error: 'Missing required payload fields' });
    }

    request.log.info({ repoFullName, prNumber, action, deliveryId }, 'Processing PR webhook');

    // Find the enabled repo in our DB
    const enabledRepo = await prisma.enabledRepository.findFirst({
      where: { githubRepoId },
    });

    if (!enabledRepo) {
      request.log.info({ githubRepoId }, 'Repo not enabled — ignoring webhook');
      return reply.code(200).send({ message: 'Repository not enabled' });
    }

    // Trigger the review asynchronously — don't block the webhook response
    // GitHub expects a response within 10 seconds
    reply.code(202).send({ message: 'Review triggered', prNumber, repo: repoFullName });

    // Run the review in the background after responding
    setImmediate(async () => {
      try {
        await PrService.triggerReviewWithGithubComment(
          enabledRepo.userId,
          enabledRepo.id,
          prNumber
        );
        request.log.info({ repoFullName, prNumber }, 'Webhook-triggered review completed');
      } catch (err) {
        request.log.error(err, 'Webhook-triggered review failed');
      }
    });
  } catch (error) {
    request.log.error(error, 'Webhook handler error');
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

/**
 * Verify the HMAC SHA-256 signature from GitHub.
 */
function verifySignature(rawBody: string | Buffer, signature: string | undefined): boolean {
  if (!signature) return false;

  const hmac = crypto.createHmac('sha256', env.WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(rawBody).digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}
