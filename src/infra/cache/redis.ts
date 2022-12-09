import IoRedis from 'ioredis';

const url = process.env.REDIS_URL;

class Redis {
  static instance: IoRedis;
  private constructor () {
    if (!url) {
      throw new Error('REDIS_URL is not defined');
    }
    Redis.instance = new IoRedis(url);
  }

  static getInstance (): IoRedis {
    if (!Redis.instance) {
      this.constructor();
    }
    return Redis.instance;
  }
}

export { Redis };
