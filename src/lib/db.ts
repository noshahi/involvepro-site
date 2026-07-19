import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient {
  if (!isDatabaseConfigured()) {
    // Return a lazy proxy so importing this module never throws when DATABASE_URL
    // is unset. Any actual query attempt will throw a clear error instead.
    return new Proxy(
      {},
      {
        get() {
          throw new Error(
            "DATABASE_URL is not configured. Set it in your environment to use database features.",
          );
        },
      },
    ) as unknown as PrismaClient;
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
