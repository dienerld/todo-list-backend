import { getDatabase, saveDatabase } from '@database/index';
import { UserRequestDto } from '@models/user/user.dtos';
import { User } from '@models/user/user.model';

class UpdateUserUseCase {
  async execute (userId: string, userDto: UserRequestDto): Promise<User> {
    try {
      const users = getDatabase();
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const user = users[userIndex];
      if (userDto.name) {
        user.name = userDto.name;
      }

      if (userDto.email) {
        user.email = userDto.email;
      }

      if (userDto.password) {
        if (userDto.password !== userDto.password_confirm) {
          throw new Error('Password does not match');
        }
        user.password = userDto.password;
      }

      users[userIndex] = user;
      saveDatabase(users);

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { UpdateUserUseCase };
