import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasource: {
    db: {
      url: 'file:./dev.db'
    }
  }
});

async function test() {
  try {
    const cats = await prisma.category.findMany();
    console.log('Categories:', cats);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
