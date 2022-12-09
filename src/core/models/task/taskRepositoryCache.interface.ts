import { TResultFind } from './taskRepository.interface';

export interface ITaskRepositoryCache {
  get<T>(userId: string): Promise<T | null>;
  set(userId: string, result: TResultFind, expiresInMin?: number): Promise<void>;
}
