import { Metadata } from 'next';
import AventurasClient from './AventurasClient';

export const metadata: Metadata = {
  title: 'Qué Hacer y Aventuras en Villa Pehuenia | Excursiones',
  description: 'Descubre increíbles actividades en Villa Pehuenia y Moquehue: trekking, paseos lacustres, cabalgatas, esquí en el Batea Mahuida y pesca con mosca. Reserva directo por WhatsApp.',
  keywords: ['qué hacer en villa pehuenia', 'actividades pehuenia', 'excursiones villa pehuenia', 'cabalgatas pehuenia', 'nieve batea mahuida', 'pesca en pehuenia'],
  openGraph: {
    title: 'Qué Hacer y Actividades de Aventura en Villa Pehuenia',
    description: 'Trekking guiado, cabalgatas por araucarias milenarias y paseos náuticos en la Patagonia. Contacta y reserva directo.',
    url: 'https://guialocal-ten.vercel.app/aventuras',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Trekking en Villa Pehuenia'
      }
    ]
  }
};

export default function Page() {
  return <AventurasClient />;
}
