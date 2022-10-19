import { getDatabase, saveDatabase } from '@database/index';

class DeleteUserUsecase {
  async execute (userId: string): Promise<void> {
    try {
      const users = getDatabase();
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      users.splice(userIndex, 1);
      saveDatabase(users);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { DeleteUserUsecase };
