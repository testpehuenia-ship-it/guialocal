export const dynamic = 'force-dynamic';

export default function DiagnosticsPage() {
  const getMaskedVal = (key: string) => {
    const val = process.env[key];
    if (val === undefined) return 'undefined (tipo undefined)';
    if (val === null) return 'null';
    if (val === 'undefined') return 'literal string "undefined" ❌';
    if (val === '') return 'empty string ""';
    
    // Mask token if any
    if (val.includes('?authToken=')) {
      const parts = val.split('?authToken=');
      return `${parts[0]}?authToken=***${parts[1].substring(parts[1].length - 5)}`;
    }
    if (val.length > 50) {
      return `${val.substring(0, 15)}... [largo: ${val.length}]`;
    }
    return val;
  };

  const keys = ['DATABASE_URL', 'TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN'];

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Diagnóstico de Variables de Entorno</h1>
      <p>Variables detectadas:</p>
      <ul>
        {keys.map(k => (
          <li key={k}>
            <strong>{k}</strong>: <code>{getMaskedVal(k)}</code>
          </li>
        ))}
      </ul>
      <hr />
      <p>Estado de VERCEL: {process.env.VERCEL === '1' ? '✅ SI' : '❌ NO'}</p>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
    </div>
  );
}
