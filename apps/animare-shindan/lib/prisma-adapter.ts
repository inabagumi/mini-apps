// The driver adapter of Prisma Client, which is shared by the app and the
// seed.
//
// The serverless driver of Neon connects over WebSockets, which a plain
// PostgreSQL server (such as the one for the tests in `compose.yaml`) does not
// accept. Set `DATABASE_ADAPTER` to `pg` to connect to such a server with
// node-postgres instead.

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";

export type DatabaseAdapter = "neon" | "pg";

/**
 * Returns the adapter that `DATABASE_ADAPTER` names. Neon is used when it is
 * not set, as in production.
 */
export const getDatabaseAdapter = (
  value = process.env.DATABASE_ADAPTER
): DatabaseAdapter => {
  if (!value || value === "neon") {
    return "neon";
  }

  if (value === "pg") {
    return value;
  }

  throw new Error(
    `DATABASE_ADAPTER must be "neon" or "pg", but got "${value}".`
  );
};

export const createPrismaAdapter = (
  connectionString = process.env.DATABASE_URL
): PrismaNeon | PrismaPg =>
  getDatabaseAdapter() === "pg"
    ? new PrismaPg({ connectionString })
    : new PrismaNeon({ connectionString });
