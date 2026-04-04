import { prisma } from '../config/db';

export class IntegrationService {
  static async saveGithubIntegration(data: {
    userId: string;
    githubId: number;
    username: string;
    accessToken: string;
  }) {
    try {
      const integration = await prisma.githubIntegration.upsert({
        where: { githubId: data.githubId },
        update: {
          userId: data.userId,
          username: data.username,
          accessToken: data.accessToken,
        },
        create: {
          userId: data.userId,
          githubId: data.githubId,
          username: data.username,
          accessToken: data.accessToken,
        },
      });
      return integration;
    } catch (error) {
      console.error('Error in saveGithubIntegration:', error);
      throw new Error('Failed to save GitHub integration');
    }
  }

  static async getGithubIntegration(userId: string) {
    try {
      const integration = await prisma.githubIntegration.findFirst({
        where: { userId },
      });
      return integration;
    } catch (error) {
      console.error('Error in getGithubIntegration:', error);
      throw new Error('Failed to get GitHub integration');
    }
  }
}
