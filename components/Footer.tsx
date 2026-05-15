export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-dark-green)',
      color: 'white',
      padding: '24px 0', /* Reducido de 40px 0 100px 0 a 24px 0 */
      marginTop: 'auto'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          <span style={{ color: 'var(--color-green)' }}>Pehuenia</span>
          <span style={{ color: 'var(--color-orange)' }}>GO</span>
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>La guía Oficial de Villa Pehuenia - Moquehue - Patagonia Argentina</p>
        <div style={{ marginTop: '16px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
          © {new Date().getFullYear()} PehueniaGO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
