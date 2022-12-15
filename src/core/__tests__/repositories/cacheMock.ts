import { IRepositoryCache } from '@presentation/cache/repositoryCache.interface';

class RedisCacheMock implements IRepositoryCache {
  async get<TResultFind> (userId: string): Promise<TResultFind | null> {
    return null;
  }

  async set<T> (userId: string, result: T, expiresInMin: number): Promise<void> { }

  async delete (id: string): Promise<void> { }
}

export { RedisCacheMock };
