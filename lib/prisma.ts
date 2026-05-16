import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let cachedPrisma: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (cachedPrisma) return cachedPrisma;

  // Intentamos obtener la URL de varias posibles fuentes para máxima compatibilidad
  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;

  if (process.env.VERCEL === '1' || url) {
    if (!url && process.env.VERCEL === '1') {
      console.error("❌ ERROR: No se encontró DATABASE_URL ni TURSO_DATABASE_URL");
    }
    
    const libsql = createClient({
      url: url || 'libsql://placeholder.turso.io',
      authToken: token,
    });

    const adapter = new PrismaLibSql(libsql as any);
    // Pasamos la URL también al constructor de Prisma para evitar el error de 'undefined'
    cachedPrisma = new PrismaClient({ 
      adapter,
      datasources: {
        db: { url: url || 'libsql://placeholder.turso.io' }
      }
    });
  } else {
    try {
      const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
      const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });
      cachedPrisma = new PrismaClient({ adapter });
    } catch (e) {
      cachedPrisma = new PrismaClient();
    }
  }
  return cachedPrisma;
}

export const prisma = globalForPrisma.prisma || getPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
