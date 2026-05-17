import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://guialocal-ten.vercel.app'),
  title: {
    default: 'PehueniaGO | Guía y Delivery en Villa Pehuenia',
    template: '%s | PehueniaGO'
  },
  description: 'Descubre dónde comer, alojarte y qué hacer en Villa Pehuenia. Pide comida directo por WhatsApp y reserva aventuras al instante.',
  keywords: ["Villa Pehuenia", "turismo", "delivery", "comida", "cabañas", "aventuras", "qué hacer", "dónde comer"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'PehueniaGO | Guía y Delivery en Villa Pehuenia',
    description: 'Descubre gastronomía, cabañas y aventuras en la joya de la Patagonia. Pedidos por WhatsApp al instante.',
    url: 'https://guialocal-ten.vercel.app',
    siteName: 'PehueniaGO',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PehueniaGO | Guía y Delivery en Villa Pehuenia',
    description: 'Descubre gastronomía, cabañas y aventuras en la Patagonia.',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${caveat.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
