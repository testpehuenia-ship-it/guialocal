import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  const isVercel = process.env.VERCEL === '1';
  
  if (isVercel || process.env.TURSO_DATABASE_URL) {
    const libsql = createClient({
      url: process.env.TURSO_DATABASE_URL || 'libsql://dummy.turso.io',
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const adapter = new PrismaLibSql(libsql as any);
    return new PrismaClient({ adapter });
  }

  // Local development fallback
  try {
    const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
    const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });
    return new PrismaClient({ adapter });
  } catch (e) {
    // Si falla el require (como en producción), devolvemos cliente estándar (fallará al conectar pero no al compilar)
    return new PrismaClient();
  }
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
