import { prisma } from './lib/db';

async function main() {
  const accs = await prisma.accommodation.findMany({
    include: { features: true }
  });
  console.log('Accommodations in database:', JSON.stringify(accs, null, 2));
}

main().catch(console.error);
