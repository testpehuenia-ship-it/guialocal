import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Función para obtener la instancia de Prisma.
 * Se inicializa solo cuando se llama por primera vez en tiempo de ejecución.
 */
export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;

  console.log('--- Iniciando conexión a DB ---');
  console.log('URL presente:', !!url);
  console.log('Ambiente:', process.env.NODE_ENV);

  if (process.env.VERCEL === '1' || (url && url.startsWith('libsql'))) {
    if (!url) {
      throw new Error("❌ ERROR FATAL: Ni DATABASE_URL ni TURSO_DATABASE_URL están definidas en el ambiente.");
    }
    
    const libsql = createClient({
      url: url,
      authToken: token,
    });

    const adapter = new PrismaLibSql(libsql as any);
    globalForPrisma.prisma = new PrismaClient({ adapter });
  } else {
    try {
      const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
      const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });
      globalForPrisma.prisma = new PrismaClient({ adapter });
    } catch (e) {
      globalForPrisma.prisma = new PrismaClient();
    }
  }

  return globalForPrisma.prisma;
}

// Mantener el export default para no romper compatibilidad, 
// pero internamente usará la función perezosa.
export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    const instance = getPrisma();
    return (instance as any)[prop];
  }
});

export default prisma;
