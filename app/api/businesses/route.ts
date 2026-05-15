import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  try {
    const businesses = await prisma.business.findMany({
      where: categoryId ? { categoryId } : {},
      include: {
        menu: true,
        category: true
      },
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(businesses);
  } catch (error: any) {
    console.error('Error fetching businesses:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image, whatsapp, categoryId, menu } = body;

    const business = await prisma.business.create({
      data: {
        name,
        image,
        whatsapp,
        categoryId,
        menu: {
          create: menu 
            ? menu
                .filter((item: any) => item.name && !isNaN(parseFloat(String(item.price))))
                .map((item: any) => ({
                  name: item.name,
                  description: item.description || '',
                  price: parseFloat(String(item.price)),
                  image: item.image || null
                })) 
            : []
        }
      },
      include: {
        menu: true,
        category: true
      }
    });

    return NextResponse.json(business);
  } catch (error: any) {
    console.error('Error creating business:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error',
      code: error.code,
      meta: error.meta
    }, { status: 500 });
  }
}
