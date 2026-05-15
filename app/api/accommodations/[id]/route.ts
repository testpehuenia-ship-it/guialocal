import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const accommodation = await prisma.accommodation.findUnique({
      where: { id },
      include: {
        features: true
      }
    });

    if (!accommodation) {
      return NextResponse.json({ error: 'Alojamiento no encontrado' }, { status: 404 });
    }

    return NextResponse.json(accommodation);
  } catch (error: any) {
    console.error('Error fetching accommodation:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, type, image, whatsapp, features } = body;

    // Primero eliminamos las características anteriores
    await prisma.feature.deleteMany({
      where: { accommodationId: id }
    });

    // Actualizamos el alojamiento y creamos las nuevas características
    const accommodation = await prisma.accommodation.update({
      where: { id },
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
  } catch (error: any) {
    console.error('Error updating accommodation:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Primero eliminamos las características relacionadas
    await prisma.feature.deleteMany({
      where: { accommodationId: id }
    });

    // Luego eliminamos el alojamiento
    await prisma.accommodation.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting accommodation:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
