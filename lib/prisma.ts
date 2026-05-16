import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Función para obtener la instancia de Prisma.
 */
export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;

  console.log('--- Conectando a Turso ---');
  console.log('URL detectada:', url ? `${url.substring(0, 15)}...` : '❌ NO ENCONTRADA');

  if (!url) {
    throw new Error("❌ DATABASE_URL no definida. Verificá las variables en Vercel.");
  }

  const libsql = createClient({
    url: url,
    authToken: token,
  });

  const adapter = new PrismaLibSql(libsql as any);
  
  // Forzamos la URL en el constructor para que Prisma no se queje de 'undefined'
  // Usamos 'as any' para evitar el error de tipos de TypeScript en el build
  globalForPrisma.prisma = new PrismaClient({ 
    adapter,
    datasources: {
      db: { url: url }
    }
  } as any);

  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    const instance = getPrisma();
    return (instance as any)[prop];
  }
});

export default prisma;
