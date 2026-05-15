import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const accommodations = await prisma.accommodation.findMany({
      include: {
        features: true
      },
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(accommodations);
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, image, whatsapp, features } = body;

    const accommodation = await prisma.accommodation.create({
      data: {
        name,
        type,
        image,
        whatsapp,
        features: {
          create: features.map((f: string) => ({ name: f }))
        }
      },
      include: {
        features: true
      }
    });

    return NextResponse.json(accommodation);
  } catch (error) {
    console.error('Error creating accommodation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
