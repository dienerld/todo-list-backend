import { getDatabase, saveDatabase } from '@database/index';
import { TaskRequestDto } from '@models/task/task.dtos';
import { Task } from '@models/task/task.model';

class CreateTaskUseCase {
  async execute (userId: string, taskDto: TaskRequestDto): Promise<Task> {
    const task = new Task(taskDto.title, taskDto.date, taskDto.hour);
    try {
      const users = getDatabase();

      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      users[userIndex].tasks.push(task);

      saveDatabase(users);
      return task;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { CreateTaskUseCase };
