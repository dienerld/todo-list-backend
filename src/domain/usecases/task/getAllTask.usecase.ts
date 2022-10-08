import { getDatabase } from '@database/index';

class GetAllTaskUseCase {
  async execute (userId: string) {
    try {
      const users = getDatabase();
      const user = users.find(user => user.id === userId);
      if (!user) {
        throw new Error('User not found');
      }

      return user.tasks;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export { GetAllTaskUseCase };
