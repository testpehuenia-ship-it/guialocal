'use client';

import { useState, useEffect } from 'react';
import { CATEGORIES_DATA } from '@/data/categories';

interface PublicityBannerProps {
  height?: string;
  delay?: string;
  maxWidth?: string;
}

export default function PublicityBanner({ 
  height = '200px', 
  delay = '0s',
  maxWidth = '600px'
}: PublicityBannerProps) {
  const [adImage, setAdImage] = useState(CATEGORIES_DATA[0].image);

  useEffect(() => {
    const updateAdImage = () => {
      const randomIndex = Math.floor(Math.random() * CATEGORIES_DATA.length);
      setAdImage(CATEGORIES_DATA[randomIndex].image);
    };

    updateAdImage();
    const adInterval = setInterval(updateAdImage, 8000);
    return () => clearInterval(adInterval);
  }, []);

  return (
    <div className="ad-banner-container" style={{ 
      height: height, 
      maxWidth: maxWidth, 
      margin: '0 auto 24px auto' 
    }}>
      <div 
        className="ad-slide ad-slide-1" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${adImage}')`,
          animationDelay: delay 
        }}
      >
        <h2 style={{ 
          fontSize: height === '100px' ? '1.5rem' : '2.5rem', 
          margin: 0, 
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)' 
        }}>
          <span style={{ color: 'var(--color-green)' }}>Pehuenia</span>
          <span style={{ color: 'var(--color-orange)' }}>GO</span>
        </h2>
        <p style={{ 
          color: 'white', 
          fontSize: height === '100px' ? '0.9rem' : '1.2rem', 
          marginTop: height === '100px' ? '4px' : '8px', 
          fontWeight: 600, 
          textShadow: '1px 1px 4px rgba(0,0,0,0.8)' 
        }}>
          Publicite Aquí
        </p>
      </div>
      <a 
        href="https://wa.me/5492942661000?text=Hola%20quiero%20publicitar%20en%20PehueniaGO" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="ad-slide ad-slide-2" 
        style={{ 
          textDecoration: 'none',
          animationDelay: delay
        }}
      >
        <h2 style={{ 
          fontSize: height === '100px' ? '1.5rem' : '2.5rem', 
          margin: 0, 
          color: 'var(--color-green)', 
          fontFamily: 'var(--font-oswald), sans-serif', 
          textTransform: 'uppercase' 
        }}>
          Publicite Aquí
        </h2>
        <p style={{ 
          color: 'var(--color-orange)', 
          fontSize: height === '100px' ? '0.9rem' : '1.2rem', 
          marginTop: height === '100px' ? '4px' : '8px', 
          fontWeight: 700 
        }}>
          Haga crecer su negocio
        </p>
      </a>
    </div>
  );
}
