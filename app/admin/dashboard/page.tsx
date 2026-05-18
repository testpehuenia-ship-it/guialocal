'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Store, 
  Home, 
  TrendingUp, 
  Plus, 
  Calendar,
  AlertCircle,
  Map
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = React.useState({
    categories: 0,
    businesses: 0,
    accommodations: 0,
  });

  React.useEffect(() => {
    // Aquí cargaríamos las estadísticas reales de la API
    const fetchStats = async () => {
      try {
        const [catRes, bizRes, accRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/businesses'),
          fetch('/api/accommodations'),
        ]);
        
        const cats = await catRes.json();
        const bizs = await bizRes.json();
        const accs = await accRes.json();
        
        setStats({
          categories: cats.length,
          businesses: bizs.length,
          accommodations: accs.length,
        });
      } catch (e) {
        console.error('Error loading stats');
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Categorías', value: stats.categories, icon: TrendingUp, color: '#0d9488' },
    { label: 'Comercios', value: stats.businesses, icon: Store, color: '#ea580c' },
    { label: 'Alojamientos', value: stats.accommodations, icon: Home, color: '#06b6d4' },
    { label: 'Visitas Hoy', value: '1,284', icon: Users, color: '#8b5cf6' },
  ];

  return (
    <div className="dashboard-view">
      <div className="view-header">
        <div>
          <h1>Panel de Control</h1>
          <p>Bienvenido al centro de administración de PehueniaGO</p>
        </div>
        <div className="date-badge">
          <Calendar size={16} />
          {new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="grid-main">
          <div className="content-card">
            <div className="card-header">
              <h2>Acciones Rápidas</h2>
            </div>
            <div className="quick-actions">
              <button className="action-btn primary" onClick={() => router.push('/admin/businesses')}>
                <Plus size={20} /> Nuevo Comercio
              </button>
              <button className="action-btn secondary" onClick={() => router.push('/admin/accommodations')}>
                <Plus size={20} /> Nuevo Alojamiento
              </button>
              <button className="action-btn secondary" onClick={() => router.push('/admin/map')}>
                <Map size={20} /> Mapas y Rutas
              </button>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h2>Últimos Comercios Cargados</h2>
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>WhatsApp</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bold">La Pizzería del Bosque</td>
                    <td><span className="badge">Pizzería</span></td>
                    <td>+54 9 2942 123456</td>
                    <td><span className="status-dot online"></span> Activo</td>
                  </tr>
                  <tr>
                    <td className="bold">Pehuenia Burger</td>
                    <td><span className="badge">Hamburguesa</span></td>
                    <td>+54 9 2942 123456</td>
                    <td><span className="status-dot online"></span> Activo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid-sidebar">
          <div className="content-card alert-card">
            <div className="alert-header">
              <AlertCircle size={20} />
              <h3>Recordatorio</h3>
            </div>
            <p>Recuerda que todas las imágenes deben tener una relación de aspecto adecuada para mobile.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        h1 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        p {
          color: #64748b;
        }

        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .date-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .grid-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .content-card {
          background: white;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          padding: 24px;
        }

        .card-header {
          margin-bottom: 20px;
        }

        .card-header h2 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
        }

        .quick-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn.primary {
          background: #0d9488;
          color: white;
          border: none;
        }

        .action-btn.primary:hover {
          background: #0f766e;
        }

        .action-btn.secondary {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .action-btn.secondary:hover {
          background: #e2e8f0;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          padding: 12px;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #64748b;
          font-weight: 600;
          border-bottom: 1px solid #f1f5f9;
        }

        .admin-table td {
          padding: 16px 12px;
          font-size: 0.9rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .bold {
          font-weight: 600;
        }

        .badge {
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.8rem;
          color: #475569;
        }

        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .status-dot.online {
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
        }

        .alert-card {
          background: #fffbeb;
          border-color: #fde68a;
        }

        .alert-header {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #b45309;
          margin-bottom: 12px;
        }

        .alert-header h3 {
          font-size: 1rem;
          font-weight: 700;
        }

        .alert-card p {
          font-size: 0.9rem;
          color: #92400e;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
