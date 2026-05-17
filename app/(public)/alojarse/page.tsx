import { Metadata } from 'next';
import AlojarseClient from './AlojarseClient';

export const metadata: Metadata = {
  title: 'Dónde Alojarse en Villa Pehuenia | Cabañas, Hoteles y Camping',
  description: 'Encuentra las mejores cabañas, hoteles, hostels y campings en Villa Pehuenia y Moquehue. Compara servicios, comodidades y reserva directo por WhatsApp.',
  keywords: ['cabañas villa pehuenia', 'alojarse en pehuenia', 'hoteles villa pehuenia', 'camping pehuenia', 'alojamiento patagonia'],
  openGraph: {
    title: 'Dónde Alojarse en Villa Pehuenia | Cabañas y Complejos Turísticos',
    description: 'Encuentra cabañas y hoteles recomendados frente al lago en Villa Pehuenia y Moquehue. Contacta directo por WhatsApp.',
    url: 'https://guialocal-ten.vercel.app/alojarse',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Cabañas en Villa Pehuenia'
      }
    ]
  }
};

export default function Page() {
  return <AlojarseClient />;
}
