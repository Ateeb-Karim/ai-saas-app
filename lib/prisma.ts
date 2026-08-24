// lib/prisma.ts

import { PrismaClient } from "@/app/generated/prisma/client"; // adjust to match your generated client path
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const dbPath = path.join(process.cwd(), "prisma", "dev.db");

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}