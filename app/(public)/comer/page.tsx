import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import ComerClient from './ComerClient';

export const metadata: Metadata = {
  title: 'Dónde Comer y Delivery en Villa Pehuenia | Restaurantes',
  description: 'Descubre las mejores pizzerías, hamburgueserías, cervecerías y restaurantes en Villa Pehuenia y Moquehue. Arma tu pedido online y envíalo por WhatsApp.',
  keywords: ['dónde comer en pehuenia', 'delivery villa pehuenia', 'restaurantes villa pehuenia', 'pizzerias pehuenia', 'comida a domicilio pehuenia'],
  openGraph: {
    title: 'Dónde Comer y Delivery en Villa Pehuenia | PehueniaGO',
    description: 'Arma tu pedido online de comida rápida, pizzas o platos regionales y recíbelo en tu cabaña en minutos.',
    url: 'https://guialocal-ten.vercel.app/comer',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Gastronomía en Villa Pehuenia'
      }
    ]
  }
};

// Revalida el caché cada 60 segundos (ISR)
export const revalidate = 60;

export default async function Page() {
  const [categories, businesses] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' }
    }),
    prisma.business.findMany({
      include: {
        menu: true,
        category: true
      },
      orderBy: { name: 'asc' }
    })
  ]);
  
  return (
    <ComerClient 
      initialCategories={JSON.parse(JSON.stringify(categories))} 
      initialBusinesses={JSON.parse(JSON.stringify(businesses))} 
    />
  );
}
