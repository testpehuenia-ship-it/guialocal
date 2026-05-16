import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

function getPrisma() {
  if (prisma) return prisma;

  const url = process.env.TURSO_DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;

  if (process.env.VERCEL === '1' || url) {
    if (!url) {
      console.error("❌ CRÍTICO: TURSO_DATABASE_URL no está definida en Vercel.");
    }
    
    const libsql = createClient({
      url: url || 'libsql://placeholder-error.turso.io',
      authToken: token,
    });

    const adapter = new PrismaLibSql(libsql as any);
    prisma = new PrismaClient({ adapter });
  } else {
    // Local fallback
    try {
      const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
      const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });
      prisma = new PrismaClient({ adapter });
    } catch (e) {
      prisma = new PrismaClient();
    }
  }
  return prisma;
}

export const prisma = globalForPrisma.prisma || getPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
