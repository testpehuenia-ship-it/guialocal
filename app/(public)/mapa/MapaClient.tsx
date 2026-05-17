'use client';

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import PublicityBanner from '@/components/PublicityBanner';

export default function MapaClient() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // Initialize only once

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: [-71.1667, -38.8833], // Villa Pehuenia
        zoom: 13,
        pitch: 45, // Tilt for 3D effect
        bearing: -17
      });

      // Add navigation controls (zoom, rotate)
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      // Add a marker for Villa Pehuenia
      new maplibregl.Marker({ color: 'var(--color-orange)' })
        .setLngLat([-71.1667, -38.8833])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML('<h3>Villa Pehuenia</h3><p>Bienvenidos al paraíso.</p>'))
        .addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      
      {/* Banner de Rutas */}
      <div style={{
        width: '100%',
        height: '260px',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-md)',
      }}>
        <img 
          src="/images/banner_rutas.png" 
          alt="Banner de Rutas Villa Pehuenia" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px',
          color: 'white'
        }}>
          <h1 style={{ 
            fontFamily: 'var(--font-oswald), sans-serif', 
            fontSize: '2.8rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            marginBottom: '8px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
          }}>
            Mapa y Rutas
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            fontWeight: 500, 
            margin: 0,
            opacity: 0.9,
            textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
            maxWidth: '500px',
            lineHeight: '1.4'
          }}>
            Estado de rutas, accesos y mapa interactivo 3D de Villa Pehuenia y Moquehue.
          </p>
        </div>
      </div>

      <PublicityBanner height="100px" />

      {/* Map Container */}
      <div style={{ 
        width: '100%', 
        height: '600px', 
        borderRadius: '24px', 
        overflow: 'hidden', 
        boxShadow: 'var(--shadow-lg)',
        border: '4px solid white',
        marginBottom: '40px',
        position: 'relative'
      }}>
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        
        {/* Map Overlay Info */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1,
          maxWidth: '250px'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-dark-green)', marginBottom: '4px' }}>Navegación 3D</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Usá el click derecho para rotar e inclinar el mapa.
          </p>
        </div>
      </div>

      <PublicityBanner delay="2s" />

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark-green)', marginBottom: '20px', borderLeft: '6px solid var(--color-orange)', paddingLeft: '16px' }}>
          Rutas y Accesos
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ color: 'var(--color-orange)', fontWeight: 700, marginBottom: '12px' }}>Desde Neuquén</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-main)' }}>
              Por RN 22 hasta Zapala, luego podés optar por RP 13 (Primeros Pinos) o RP 46 (Rahue). 
              Consultá siempre el estado de rutas antes de viajar.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ color: 'var(--color-orange)', fontWeight: 700, marginBottom: '12px' }}>Desde Aluminé</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-main)' }}>
              A través de la RP 23, bordeando el río Aluminé. Un camino escénico imperdible.
            </p>
          </div>
        </div>
      </section>

      <PublicityBanner delay="4s" />
    </div>
  );
}
