import { PrismaClient } from '../../prisma/generated';

// In serverless (Vercel), we reuse the client across warm invocations
// to avoid creating a new connection on every request
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
