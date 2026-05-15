import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Nota: Prisma 7 requiere que el adaptador reciba un objeto con la propiedad 'url'
const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
