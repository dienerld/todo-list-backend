import ioRedis from 'ioredis';
import { IRepositoryCache } from '@presentation/cache/repositoryCache.interface';
import { Redis } from './redis';

class RedisRepository implements IRepositoryCache {
  static client: ioRedis;
  constructor () {
    if (!RedisRepository.client) {
      RedisRepository.client = Redis();
    }
  }

  async get<T> (id: string): Promise<T | null> {
    const result = await RedisRepository.client.get(id);
    if (!result) { return null }

    return JSON.parse(result);
  }

  async set<T> (id: string, value: T, expiresInMin?: number | undefined): Promise<void> {
    if (expiresInMin) {
      const seconds = expiresInMin * 60;
      await RedisRepository.client.setex(id, seconds, JSON.stringify(value));
    }
    await RedisRepository.client.set(id, JSON.stringify(value));
  }

  async delete (id: string): Promise<void> {
    await RedisRepository.client.del([id]);
  }
}

export { RedisRepository };
