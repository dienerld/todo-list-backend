import { getDatabase, saveDatabase } from '@database/index';
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
      task.toggleHidden();
      users[userIndex].tasks[taskIndex] = task;
      saveDatabase(users);
      return task;
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

    users[userIndex].tasks[taskIndex] = task;
    saveDatabase(users);

    return task;
  }
}

export { UpdateTaskUseCase };
