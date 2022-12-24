export interface IRepositoryCache {
  get<T>(id: string): Promise<T | null>;
  set<T>(id: string, value: T, expiresInMin?: number): Promise<void>;
  delete(id: string): Promise<void>;
  disconnect(): Promise<void>
}
