'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bike, BedDouble, MountainSnow, ShoppingBag, 
  Rocket, Home, Compass, Store, 
  Clock, ShieldCheck, Heart, HeartHandshake,
  ChevronRight, ChevronLeft
} from 'lucide-react';
import PublicityBanner from '@/components/PublicityBanner';

const BACKGROUND_IMAGES = [
  "/images/bg_slider_1.jpg",
  "/images/bg_slider_2.jpg",
  "/images/bg_slider_3.jpg",
  "/images/bg_slider_4.jpg",
];

export default function HomePage() {
  const [bgIndex, setBgIndex] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (e) {
      console.error('Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      
      {/* 1. HERO SECTION WITH SLIDER */}
      <section style={{ 
        position: 'relative', 
        padding: '60px 20px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        minHeight: '450px'
      }}>
        {BACKGROUND_IMAGES.map((src, index) => (
          <div 
            key={src}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === bgIndex ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: 0
            }}
          />
        ))}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '600px' }}>
          <h1 style={{ fontFamily: 'var(--font-oswald), sans-serif', fontSize: '4.5rem', fontWeight: 700, color: 'white', lineHeight: 0.9, marginBottom: '0px', textTransform: 'uppercase', letterSpacing: '1px', textShadow: '2px 4px 10px rgba(0,0,0,0.5)' }}>
            TODO PEHUENIA
          </h1>
          <h2 style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '3.5rem', color: '#f1c40f', lineHeight: 0.8, marginBottom: '24px', transform: 'rotate(-2deg)', textShadow: '1px 2px 4px rgba(0,0,0,0.5)' }}>
            en un solo lugar
          </h2>
          
          <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 500, marginBottom: '32px', textShadow: '1px 1px 4px rgba(0,0,0,0.8)', padding: '0 10px' }}>
            Comé rico, alojate cómodo,<br/>viví aventuras y pedí sin<br/>moverte de tu cabaña.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '20px' }}>
            {[
              { icon: Bike, text: "DELIVERY\nRÁPIDO" },
              { icon: BedDouble, text: "ALOJAMIENTOS\nPARA TODOS" },
              { icon: MountainSnow, text: "AVENTURAS\nY ACTIVIDADES" },
              { icon: ShoppingBag, text: "COMERCIOS\nLOCALES" }
            ].map((item, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.3)' : 'none' }}>
                <item.icon color="white" size={28} style={{ marginBottom: '8px' }} />
                <span style={{ color: 'white', fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'pre-line', lineHeight: 1.2 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAIN ACTION BUTTONS */}
      <section style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto', marginTop: '-30px', position: 'relative', zIndex: 10 }}>
        {[
          { title: "PEDÍ COMIDA AHORA", sub: "Delivery a tu cabaña", icon: Rocket, color: "var(--color-orange)", link: "/comer" },
          { title: "ENCONTRÁ TU ALOJAMIENTO", sub: "Las mejores opciones", icon: Home, color: "var(--color-green)", link: "/alojarse" },
          { title: "VER AVENTURAS", sub: "Reservá tu experiencia", icon: Compass, color: "var(--color-dark-green)", link: "/aventuras" },
          { title: "VER COMERCIOS", sub: "Tiendas y servicios locales", icon: ShoppingBag, color: "var(--color-purple)", link: "/comercios" },
        ].map((btn, idx) => (
          <Link href={btn.link} key={idx} style={{ backgroundColor: btn.color, borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}>
            <div style={{ marginRight: '16px' }}>
              <btn.icon size={36} color="white" strokeWidth={1.5} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-oswald), sans-serif', letterSpacing: '0.5px' }}>{btn.title}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{btn.sub}</div>
            </div>
            <ChevronRight size={24} color="white" />
          </Link>
        ))}
      </section>

      {/* 3. TRUST BADGES */}
      <section style={{ backgroundColor: 'white', padding: '30px 20px', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px', margin: '0 auto' }}>
          {[
            { icon: Clock, title: "RÁPIDO", sub: "Entrega en\nminutos" },
            { icon: ShieldCheck, title: "SEGURO", sub: "Comercios\nverificados" },
            { icon: Heart, title: "LOCAL", sub: "Apoyá lo\nnuestro" },
            { icon: HeartHandshake, title: "SIEMPRE", sub: "Atención\ncercana" }
          ].map((item, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRight: idx < 3 ? '1px solid var(--color-border)' : 'none' }}>
              <item.icon size={32} color="var(--color-dark-green)" style={{ marginBottom: '8px' }} strokeWidth={1.5} />
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-dark-green)', marginBottom: '4px' }}>{item.title}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', whiteSpace: 'pre-line', lineHeight: 1.2 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOTTOM CATEGORIES SLIDER */}
      <section style={{ padding: '30px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-dark-green)' }}>DESCUBRÍ PEHUENIA</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Opciones para cada momento de tu viaje</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => document.getElementById('category-slider')?.scrollBy({ left: -200, behavior: 'smooth' })}
              style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
            >
              <ChevronLeft size={20} color="var(--color-dark-green)" />
            </button>
            <button 
              onClick={() => document.getElementById('category-slider')?.scrollBy({ left: 200, behavior: 'smooth' })}
              style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-dark-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={20} color="white" />
            </button>
          </div>
        </div>
        
        <div 
          id="category-slider"
          style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
        >
          {loading ? (
             [1,2,3,4].map(i => <div key={i} style={{ minWidth: '160px', height: '120px', borderRadius: '16px', backgroundColor: '#f1f5f9', animation: 'pulse 1.5s infinite' }} />)
          ) : (
            categories.map((cat, idx) => (
              <Link 
                href={cat.link || '/'} 
                key={idx} 
                style={{ minWidth: '160px', height: '120px', borderRadius: '16px', overflow: 'hidden', position: 'relative', scrollSnapAlign: 'start', display: 'block' }}
              >
                {cat.image ? (
                  <Image src={cat.image} alt={cat.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#e2e8f0' }} />
                )}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%)', display: 'flex', alignItems: 'flex-end', padding: '12px' }}>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                    {cat.title}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <PublicityBanner />
      
      <style jsx global>{`
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}
