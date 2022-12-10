import { appDataSource } from '@database/data-source';
import { Task } from '@models/task/task.model';
import { ITaskRepository, TFiltersQuery, TResultFind } from '@models/task/taskRepository.interface';
import { ILike, Repository } from 'typeorm';

class TaskRepository implements ITaskRepository {
  repository: Repository<Task>;
  constructor () {
    this.repository = appDataSource.getRepository<Task>(Task);
  }

  async findById (id: string): Promise<Task | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll (userId: string): Promise<TResultFind> {
    const [tasks, total] = await this.repository.findAndCount({
      where: { userId },
      order: { date: 'ASC', hour: 'ASC' }
    });
    return { tasks, total };
  }

  async save (userId: string, task: Task): Promise<void> {
    await this.repository.save({ ...task, userId });
  }

  async update (userId: string, task: Task): Promise<void> {
    await this.repository.update({ id: task.id, userId }, task);
  }

  async delete (id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findWithFilters (userId: string, filters: TFiltersQuery): Promise<TResultFind> {
    const { title, hidden } = filters;

    const [tasks, total] = await this.repository.findAndCount({
      where: {
        userId,
        ...(hidden && { hidden }),
        ...(title && { title: ILike(`%${title}%`) })
      },
      order: { date: 'ASC', hour: 'ASC' }
    });
    return { total, tasks };
  }
}

export { TaskRepository };
