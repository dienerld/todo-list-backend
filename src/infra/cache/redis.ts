import IoRedis from 'ioredis';

const HOST = process.env.REDIS_HOST;
const PORT = process.env.REDIS_PORT;
const PASS = process.env.REDIS_PASSWORD;
const URL = process.env.REDIS_URL;

class Redis {
  static INSTANCE: IoRedis;
  private constructor () {}
  static create () {
    if (Redis.INSTANCE) {
      return Redis.INSTANCE;
    }

    if (URL) {
      Redis.INSTANCE = new IoRedis(URL);
    } else if (!HOST || !PORT || !PASS) {
      throw new Error('Redis configuration is missing');
    } else {
      Redis.INSTANCE = new IoRedis(Number(PORT), HOST, { password: PASS });
    }

    return Redis.INSTANCE;
  };
};

export { Redis };
