import { prisma } from '../config/db';

interface UserPayload {
  email: string;
  name: string;
  avatarUrl: string;
  provider: string;
}

export class AuthService {
  /**
   * Sync a Google-authenticated user into our database.
   * Creates the user if they don't exist, updates profile fields if they do.
   */
  static async syncUser(payload: UserPayload) {
    const user = await prisma.user.upsert({
      where: { email: payload.email },
      update: {
        name: payload.name,
        avatarUrl: payload.avatarUrl,
      },
      create: {
        email: payload.email,
        name: payload.name,
        avatarUrl: payload.avatarUrl,
        provider: payload.provider,
      },
    });
    return user;
  }

  /**
   * Fetch a user by ID including their GitHub integration status.
   * This is used by /auth/me to return the full user profile.
   */
  static async getUserWithIntegrations(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        githubIntegration: {
          select: {
            username: true,
            avatarUrl: true,
            githubId: true,
          },
        },
      },
    });
    return user;
  }

  /**
   * Fetch a user by their email address.
   */
  static async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  /**
   * Fetch a user by their database ID.
   */
  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
}
