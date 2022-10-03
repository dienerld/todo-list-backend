import { getDatabase, saveDatabase } from '@database/index';
import { TaskUpdateRequestDto } from '@models/task/task.dtos';
import { TaskStatus } from '@models/task/task.model';

class UpdateTaskUseCase {
  async execute (userId: string, taskId: string, taskDto: TaskUpdateRequestDto) {
    const DB = getDatabase();
    const userIndex = DB.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const taskIndex = DB.users[userIndex].tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    const task = DB.users[userIndex].tasks[taskIndex];
    if (taskDto.title) {
      task.title = taskDto.title;
    }

    if (taskDto.description) {
      task.description = taskDto.description;
    }

    if (taskDto.status && !Object.values(TaskStatus).includes(taskDto.status)) {
      throw new Error('Invalid status');
    }

    if (taskDto.status) {
      task.status = TaskStatus[taskDto.status];
    }

    DB.users[userIndex].tasks[taskIndex] = task;
    saveDatabase(DB);

    return task;
  }
}

export { UpdateTaskUseCase };
