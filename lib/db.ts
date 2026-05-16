import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

console.log('>>> [DB_INIT] Cargando módulo lib/db.ts');

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;

function createInstance() {
  console.log('>>> [DB_INIT] Creando nueva instancia de PrismaClient');
  console.log('>>> [DB_INIT] URL:', url ? url.substring(0, 20) + '...' : '❌ NULL');

  if (process.env.VERCEL === '1' || (url && url.startsWith('libsql'))) {
    const libsql = createClient({
      url: url || 'libsql://error-missing-url.turso.io',
      authToken: token,
    });

    const adapter = new PrismaLibSql(libsql as any);
    return new PrismaClient({ 
      adapter,
      // @ts-ignore
      datasources: { db: { url: url } }
    } as any);
  }

  // Local fallback
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma || createInstance();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
