import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import ComerciosClient from './ComerciosClient';

export const metadata: Metadata = {
  title: 'Guía Local y Comercios de Villa Pehuenia | Servicios',
  description: 'Directorio completo de comercios, farmacias, supermercados, instituciones y servicios públicos en Villa Pehuenia y Moquehue. Dirección y contacto directo.',
  keywords: ['guia local villa pehuenia', 'comercios en villa pehuenia', 'servicios pehuenia', 'farmacias en villa pehuenia', 'supermercado villa pehuenia'],
  openGraph: {
    title: 'Guía Local, Comercios y Servicios en Villa Pehuenia | PehueniaGO',
    description: 'Encuentra comercios, instituciones públicas, números de emergencia, farmacias y más en el directorio definitivo de la villa.',
    url: 'https://guialocal-ten.vercel.app/comercios',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Comercios locales en Villa Pehuenia'
      }
    ]
  }
};

// Revalida el caché cada 60 segundos (ISR)
export const revalidate = 60;

export default async function Page() {
  const services = await prisma.localService.findMany({
    orderBy: { name: 'asc' }
  });
  
  return <ComerciosClient initialServices={JSON.parse(JSON.stringify(services))} />;
}
