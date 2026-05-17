if (!process.env.DATABASE_URL) {
  console.log('>>> [ENV_INIT] Inyectando DATABASE_URL de fallback: file:./dev.db');
  process.env.DATABASE_URL = 'file:./dev.db';
}
export {};
