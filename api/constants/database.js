module.exports = {
  URL: process.env.POSTGRES_URL || '127.0.0.1',
  PORT: process.env.POSTGRES_PORT || 5432,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DB: process.env.POSTGRES_DB,
};
