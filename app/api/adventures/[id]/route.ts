import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const adventure = await prisma.adventure.update({
      where: { id },
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
    return NextResponse.json({ error: 'Error updating adventure' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.adventure.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting adventure' }, { status: 500 });
  }
}
