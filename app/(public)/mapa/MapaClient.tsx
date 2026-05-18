'use client';

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import PublicityBanner from '@/components/PublicityBanner';

interface RouteItem {
  id: string;
  title: string;
  status: string;
  description: string;
}

interface MapMarkerItem {
  id: string;
  title: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  color: string;
}

interface MapaClientProps {
  initialRoutes: RouteItem[];
  initialMarkers: MapMarkerItem[];
}

export default function MapaClient({ initialRoutes, initialMarkers }: MapaClientProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const getRouteBorderColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'transitable':
        return '#16a34a'; // green
      case 'precaución':
      case 'transitable con precaución':
        return '#ea580c'; // orange
      case 'cerrado':
      case 'intransitable':
        return '#dc2626'; // red
      default:
        return '#64748b'; // slate
    }
  };

  const getRouteBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'transitable':
        return 'badge-success';
      case 'precaución':
      case 'transitable con precaución':
        return 'badge-warning';
      case 'cerrado':
      case 'intransitable':
        return 'badge-danger';
      default:
        return 'badge-default';
    }
  };

  useEffect(() => {
    if (map.current) return; // Initialize only once

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: [-71.1667, -38.8833], // Villa Pehuenia
        zoom: 12,
        pitch: 45, // Tilt for 3D effect
        bearing: -17,
        cooperativeGestures: true // Permite el scroll vertical de la página con un dedo, y mover mapa con dos dedos
      });

      // Add navigation controls (zoom, rotate)
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      // Add markers from database dynamically
      const markersToRender = initialMarkers.length > 0 ? initialMarkers : [
        {
          id: 'default',
          title: 'Villa Pehuenia',
          description: 'Bienvenidos al paraíso.',
          longitude: -71.1667,
          latitude: -38.8833,
          color: '#ea580c'
        }
      ];

      markersToRender.forEach((marker) => {
        new maplibregl.Marker({ color: marker.color || '#ea580c' })
          .setLngLat([marker.longitude, marker.latitude])
          .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(`
            <div style="padding: 6px;">
              <h3 style="margin: 0 0 4px 0; font-size: 1rem; font-weight: 700; color: #0d9488;">${marker.title}</h3>
              <p style="margin: 0; font-size: 0.85rem; color: #475569;">${marker.description || ''}</p>
            </div>
          `))
          .addTo(map.current!);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initialMarkers]);

  const routesToRender = initialRoutes.length > 0 ? initialRoutes : [
    {
      id: 'r1',
      title: 'Desde Neuquén',
      status: 'Transitable',
      description: 'Por RN 22 hasta Zapala, luego podés optar por RP 13 (Primeros Pinos) o RP 46 (Rahue). RP 13 suele acumular nieve en invierno.'
    },
    {
      id: 'r2',
      title: 'Desde Aluminé',
      status: 'Transitable',
      description: 'A través de la RP 23, bordeando el hermoso río Aluminé. Camino escénico de ripio consolidado.'
    }
  ];

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

      {/* Map Container Wrapper */}
      <div className="map-wrapper">
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        
        {/* Map Overlay Info */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1,
          maxWidth: '260px'
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark-green)', marginBottom: '4px' }}>Mapa Interactivo 3D</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.3' }}>
            <strong>Celular:</strong> Desliza dos dedos para mover. <br />
            <strong>PC:</strong> Clic derecho para rotar e inclinar.
          </p>
        </div>
      </div>

      <PublicityBanner delay="2s" />

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark-green)', marginBottom: '20px', borderLeft: '6px solid var(--color-orange)', paddingLeft: '16px' }}>
          Rutas y Accesos
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {routesToRender.map((route) => (
            <div 
              key={route.id} 
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '20px', 
                boxShadow: 'var(--shadow-sm)',
                borderTop: `4px solid ${getRouteBorderColor(route.status)}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'var(--color-text-main)', fontWeight: 700, margin: 0, fontSize: '1.1rem' }}>{route.title}</h3>
                <span className={`status-badge ${getRouteBadgeClass(route.status)}`}>
                  {route.status}
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-main)', margin: 0 }}>
                {route.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <PublicityBanner delay="4s" />

      <style jsx>{`
        .status-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 12px;
          text-transform: uppercase;
        }
        .badge-success { background-color: #dcfce7; color: #15803d; }
        .badge-warning { background-color: #ffedd5; color: #c2410c; }
        .badge-danger { background-color: #fee2e2; color: #b91c1c; }
        .badge-default { background-color: #f1f5f9; color: #475569; }

        .map-wrapper {
          width: 100%;
          height: 600px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 4px solid white;
          margin-bottom: 40px;
          position: relative;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .map-wrapper {
            width: 92% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            height: 420px !important;
            border-radius: 16px;
          }
        }
      `}</style>
    </div>
  );
}
