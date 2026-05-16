export const dynamic = 'force-dynamic';

export default function DiagnosticsPage() {
  const envVars = Object.keys(process.env).filter(k => 
    k.includes('DATABASE') || k.includes('TURSO') || k.includes('URL') || k.includes('TOKEN')
  );

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Diagnóstico de Variables de Entorno</h1>
      <p>Variables detectadas (solo nombres):</p>
      <ul>
        {envVars.length > 0 ? (
          envVars.map(v => <li key={v}>{v}: ✅ PRESENTE</li>)
        ) : (
          <li>❌ No se detectó ninguna variable relacionada con la DB</li>
        )}
      </ul>
      <hr />
      <p>Estado de VERCEL: {process.env.VERCEL === '1' ? '✅ SI' : '❌ NO'}</p>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
    </div>
  );
}
