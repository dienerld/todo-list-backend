import { IRepositoryCache } from '@presentation/cache/repositoryCache.interface';

type TDataCache = {
  [key: string]: any;
}
class RedisCacheMock implements IRepositoryCache {
  cache: TDataCache[];

  constructor () {
    this.cache = [];
  }

  async get<T> (id: string): Promise<T | null> {
    const result = this.cache[id];
    if (!result) {
      return null;
    }
    return result as T;
  }

  async set<T> (id: string, result: T, expiresInMin: number): Promise<void> {
    if (!expiresInMin) {
      this.cache[id] = result;
    } else if (expiresInMin <= 0) {
      throw Error('expiresInMin invalid');
    } else {
      this.cache[id] = result;
    }
  }

  async delete (id: string): Promise<void> {
    delete this.cache[id];
  }
}

export { RedisCacheMock };
