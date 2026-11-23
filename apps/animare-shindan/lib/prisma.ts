import { PrismaClient } from "./generated/prisma/client";
import { createPrismaAdapter } from "./prisma-adapter";

const createPrismaClient = (): PrismaClient =>
  new PrismaClient({ adapter: createPrismaAdapter() });

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
