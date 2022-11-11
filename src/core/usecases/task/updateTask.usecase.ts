import { getDatabase, saveDatabase } from '../../../infra/database/index';
import { TaskUpdateRequestDto } from '@models/task/task.dtos';

class UpdateTaskUseCase {
  async execute (userId: string, taskId: string, taskDto?: TaskUpdateRequestDto) {
    const users = getDatabase();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const taskIndex = users[userIndex].tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    const task = users[userIndex].tasks[taskIndex];

    if (!taskDto) {
      throw new Error('Task data not provided');
    }

    if (taskDto.title) {
      task.title = taskDto.title;
    }

    if (taskDto.date) {
      task.date = taskDto.date;
    }

    if (taskDto.hour) {
      task.hour = taskDto.hour;
    }

    if (taskDto.done !== undefined) {
      task.toggleDone();
    }

    if (taskDto.hidden !== undefined) {
      task.toggleHidden();
    }

    users[userIndex].tasks[taskIndex] = task;
    saveDatabase(users);

    return task;
  }
}

export { UpdateTaskUseCase };
