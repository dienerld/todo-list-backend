import IoRedis from 'ioredis';

const HOST = process.env.REDIS_HOST;
const PORT = process.env.REDIS_PORT;
const PASS = process.env.REDIS_PASSWORD;
const URL = process.env.REDIS_URL;

const Redis = () => {
  if (URL) {
    return new IoRedis(URL);
  } else if (!HOST || !PORT || !PASS) {
    throw new Error('Redis configuration is missing');
  }
  return new IoRedis(Number(PORT), HOST, { password: PASS });
};

export { Redis };
