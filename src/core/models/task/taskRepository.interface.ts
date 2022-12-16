import { TTask } from './task.dtos';
import { Task } from './task.model';

export type TFiltersQuery = Omit<Partial<TTask>, 'id' | 'created_at' | 'updated_at' | 'user_id'| 'hour'>

export type TResultFind = {
  tasks: Task[];
  total: number;
}
export interface ITaskRepository {
  findById(id: string, userId: string): Promise<Task | null>;
  findAll(userId: string): Promise<TResultFind>;
  findWithFilters(userId: string, filters: TFiltersQuery): Promise<TResultFind>;
  save(userId: string, task: Task): Promise<void>;
  update(userId: string, task: Task): Promise<void>;
  delete(id: string): Promise<void>;
}
