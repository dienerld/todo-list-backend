import 'dotenv/config';

export const cacheConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  expiresInMin: 30
};
