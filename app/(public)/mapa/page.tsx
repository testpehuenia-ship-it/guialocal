import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import MapaClient from './MapaClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Mapa Interactivo 3D y Estado de Rutas de Villa Pehuenia',
  description: 'Explora Villa Pehuenia y Moquehue con nuestro mapa 3D interactivo. Conoce las principales rutas de acceso desde Neuquén y Aluminé.',
  keywords: ['mapa villa pehuenia', 'rutas a villa pehuenia', 'moquehue mapa 3d', 'como llegar a villa pehuenia', 'estado de rutas pehuenia'],
  openGraph: {
    title: 'Mapa Interactivo 3D y Rutas de Acceso a Villa Pehuenia | PehueniaGO',
    description: 'Navega en 3D por la villa, localiza atractivos turísticos y planifica tu ruta de llegada de forma segura.',
    url: 'https://guialocal-ten.vercel.app/mapa',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Mapa de Villa Pehuenia'
      }
    ]
  }
};

export default async function Page() {
  const routes = await prisma.route.findMany({
    orderBy: { createdAt: 'asc' }
  });
  const markers = await prisma.mapMarker.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <MapaClient initialRoutes={JSON.parse(JSON.stringify(routes))} initialMarkers={JSON.parse(JSON.stringify(markers))} />;
}
