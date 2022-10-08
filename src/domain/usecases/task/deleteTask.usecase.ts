import { getDatabase, saveDatabase } from '@database/index';

class DeleteTaskUseCase {
  async execute (userId: string, taskId: string): Promise<void> {
    const users = getDatabase();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const taskIndex = users[userIndex].tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    users[userIndex].tasks.splice(taskIndex, 1);
    saveDatabase(users);
  }
}

export { DeleteTaskUseCase };
