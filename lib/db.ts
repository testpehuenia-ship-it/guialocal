import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

console.log('>>> [DB_INIT] Cargando módulo lib/db.ts');

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Para evitar el error URL_INVALID en Vercel, inyectamos un valor de fallback válido para SQLite.
// Prisma requiere una URL válida de SQLite (que empiece con 'file:') para validar internamente el esquema,
// pero todas las consultas reales se desviarán a Turso a través del Driver Adapter.
if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('file:')) {
  console.log('>>> [DB_INIT] Inyectando DATABASE_URL temporal para validación de Prisma:', 'file:./dev.db');
  process.env.DATABASE_URL = 'file:./dev.db';
}

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;

function createInstance() {
  console.log('>>> [DB_INIT] Creando nueva instancia de PrismaClient');
  console.log('>>> [DB_INIT] URL Detectada:', url ? url.substring(0, 20) + '...' : '❌ NULL');

  if (process.env.VERCEL === '1' || (url && url.startsWith('libsql'))) {
    const libsql = createClient({
      url: url || 'libsql://error.turso.io',
      authToken: token,
    });

    const adapter = new PrismaLibSql(libsql as any);
    // Ya no pasamos 'datasources' porque Prisma leerá DATABASE_URL automáticamente
    // ahora que confirmamos que está presente en el ambiente.
    return new PrismaClient({ adapter });
  }

  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma || createInstance();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
