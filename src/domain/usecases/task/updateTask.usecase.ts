import { getDatabase, saveDatabase } from '../../../database';
import { TaskUpdateRequestDto } from '../../models/task/task.dtos';
import { TaskStatus } from '../../models/task/task.model';

class UpdateTaskUseCase {
  async execute (userId: string, taskId: string, taskDto: TaskUpdateRequestDto) {
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

    users[userIndex].tasks[taskIndex] = task;
    saveDatabase(users);

    return task;
  }
}

export { UpdateTaskUseCase };
