import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  // En Vercel o producción, forzar Turso (libSQL)
  const isVercel = process.env.VERCEL === '1';
  
  if (isVercel || process.env.TURSO_DATABASE_URL) {
    const { PrismaLibSQL } = require('@prisma/adapter-libsql');
    const { createClient } = require('@libsql/client');

    const libsql = createClient({
      url: process.env.TURSO_DATABASE_URL || 'libsql://dummy.turso.io', // Fallback para build
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({ adapter });
  }

  // Desarrollo local: usar better-sqlite3 (solo si no es Vercel)
  const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
  const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
