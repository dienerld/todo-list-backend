import { Task } from './task.model';

export interface ITaskRepository {
  findById(id: string): Promise<Task | undefined>;
  findAll(userId: string): Promise<Task[]>;
  save(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
}
