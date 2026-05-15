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
  title: "PehueniaGO | Guía y Delivery en Villa Pehuenia",
  description: "Descubre dónde comer, alojarte y qué hacer en Villa Pehuenia. Pide comida directo por WhatsApp y reserva aventuras al instante.",
  keywords: ["Villa Pehuenia", "turismo", "delivery", "comida", "cabañas", "aventuras", "qué hacer", "dónde comer"],
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
