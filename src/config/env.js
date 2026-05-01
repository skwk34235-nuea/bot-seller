const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_NAME: process.env.APP_NAME || 'Starlight Bot Store',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  PORT: Number(process.env.PORT || 3000),
  SESSION_SECRET: process.env.SESSION_SECRET || 'change-this-secret',
  SESSION_NAME: process.env.SESSION_NAME || 'starlight.sid',
  SESSION_MAX_AGE: Number(process.env.SESSION_MAX_AGE || 86400000),
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_PORT: Number(process.env.DB_PORT || 3306),
  DB_NAME: process.env.DB_NAME || 'bot_seller',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_CONNECTION_LIMIT: Number(process.env.DB_CONNECTION_LIMIT || 10),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@example.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '123456',
  SOCKET_CORS_ORIGIN: process.env.SOCKET_CORS_ORIGIN || process.env.APP_URL || 'http://localhost:3000'
};
