import { User } from './user.model';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByIdWithTasks(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
