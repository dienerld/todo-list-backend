import { appDataSource } from '@database/data-source';
import { taskSchema } from '@database/schemas/task.schema';
import { Task } from '@models/task/task.model';
import { ITaskRepository } from '@models/task/taskRepository.interface';
import { Repository } from 'typeorm';

class TaskRepository implements ITaskRepository {
  repository: Repository<Task>;
  constructor () {
    this.repository = appDataSource.getRepository<Task>(taskSchema);
  }

  async findById (id: string): Promise<Task> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  findAll (userId: string): Promise<Task[]> {
    return this.repository.find({
      where: { user_id: userId },
      order: { date: 'ASC', hour: 'ASC' }
    });
  }

  async save (task: Task): Promise<void> {
    await this.repository.save(task);
  }

  async update (task: Task): Promise<void> {
    await this.repository.update(task.id, task);
  }

  async delete (id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { TaskRepository };
