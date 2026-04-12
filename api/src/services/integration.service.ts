import { prisma } from '../config/db';

export class IntegrationService {
  static async saveGithubIntegration(data: {
    userId: string;
    githubId: number;
    username: string;
    accessToken: string;
    avatarUrl: string | null;
  }) {
    // Use upsert on userId (unique) — one GitHub account per user
    const integration = await prisma.githubIntegration.upsert({
      where: { userId: data.userId },
      update: {
        githubId: data.githubId,
        username: data.username,
        accessToken: data.accessToken,
        avatarUrl: data.avatarUrl,
      },
      create: {
        userId: data.userId,
        githubId: data.githubId,
        username: data.username,
        accessToken: data.accessToken,
        avatarUrl: data.avatarUrl,
      },
    });
    return integration;
  }

  static async getGithubIntegration(userId: string) {
    const integration = await prisma.githubIntegration.findUnique({
      where: { userId },
    });
    return integration;
  }

  static async deleteGithubIntegration(userId: string) {
    // Only delete if it exists (findUnique + delete to avoid errors)
    const existing = await prisma.githubIntegration.findUnique({
      where: { userId },
    });
    if (existing) {
      await prisma.githubIntegration.delete({
        where: { userId },
      });
    }
    return existing;
  }
}
