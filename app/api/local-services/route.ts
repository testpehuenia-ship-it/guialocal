import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await prisma.localService.findMany({
      orderBy: { category: 'asc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const service = await prisma.localService.create({
      data: {
        name: body.name,
        category: body.category,
        address: body.address,
        whatsapp: body.whatsapp,
        image: body.image
      }
    });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating service' }, { status: 500 });
  }
}
