import { UserRequestDto } from '@models/user/user.dtos';
import { User } from '@models/user/user.model';
import { IUserRepository } from '@models/user/userRepository.interface';

class CreateUserUseCase {
  constructor (private readonly userRepository: IUserRepository) {}
  async execute (userDto: UserRequestDto): Promise<User> {
    console.log('Create User Use Case');

    if (userDto.password !== userDto.password_confirm) {
      throw new Error('Password does not match');
    }

    const user = new User(userDto.name, userDto.email, userDto.password);
    try {
      console.log('user', user);
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { CreateUserUseCase };
