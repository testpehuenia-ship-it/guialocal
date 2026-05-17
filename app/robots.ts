import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://guialocal-ten.vercel.app';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',       // Protege el panel de control administrativo
        '/api/',         // No indexar llamadas internas del API
        '/diagnostico'   // Ocultar página técnica de variables
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
