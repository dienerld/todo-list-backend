import { getDatabase, saveDatabase } from '../../../infra/database/index';
import { UserRequestDto } from '@models/user/user.dtos';
import { User } from '@models/user/user.model';

class CreateUserUseCase {
  async execute (userDto: UserRequestDto): Promise<User> {
    if (userDto.password !== userDto.password_confirm) {
      throw new Error('Password does not match');
    }

    const user = new User(userDto.name, userDto.email, userDto.password);
    try {
      const users = getDatabase();

      users.push(user);
      saveDatabase(users);

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { CreateUserUseCase };
