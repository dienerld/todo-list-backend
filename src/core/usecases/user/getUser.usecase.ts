import { getDatabase } from '../../../infra/database/index';
import { User } from '@models/user/user.model';

class GetUserUseCase {
  async execute (userId: string): Promise<User> {
    try {
      const users = getDatabase();

      const user = users.find((user) => user.id === userId);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export { GetUserUseCase };
