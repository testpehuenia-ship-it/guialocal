import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Guía Local y Delivery en Villa Pehuenia | PehueniaGO',
  description: 'Descubre los mejores alojamientos, dónde comer rico y qué aventuras hacer en Villa Pehuenia y Moquehue. Pide comida por WhatsApp en minutos.',
  keywords: ['villa pehuenia', 'delivery pehuenia', 'comer en pehuenia', 'cabañas pehuenia', 'turismo patagonia'],
  openGraph: {
    title: 'PehueniaGO | Guía Local y Delivery en Villa Pehuenia',
    description: 'Encuentra alojamiento, gastronomía y aventuras en Villa Pehuenia. Tu guía local digital patagónica.',
    url: 'https://guialocal-ten.vercel.app',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Villa Pehuenia Lago Aluminé'
      }
    ]
  }
};

export default function Page() {
  return <HomeClient />;
}
