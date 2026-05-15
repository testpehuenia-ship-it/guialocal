import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const adventures = await prisma.adventure.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(adventures);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching adventures' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const adventure = await prisma.adventure.create({
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
        whatsapp: body.whatsapp,
        category: body.category,
        details: body.details || ''
      }
    });
    return NextResponse.json(adventure);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating adventure' }, { status: 500 });
  }
}
