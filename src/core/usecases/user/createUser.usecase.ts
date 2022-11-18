import { UserRequestDto } from '@models/user/user.dtos';
import { User } from '@models/user/user.model';
import { IUserRepository } from '@models/user/userRepository.interface';
import { CustomError, InvalidParamError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

class CreateUserUseCase {
  constructor (private readonly userRepository: IUserRepository) {}
  async execute (userDto: UserRequestDto): Promise<IHttpResponse> {
    if (userDto.password !== userDto.password_confirm) {
      throw new InvalidParamError('Password does not match');
    }

    const user = new User(userDto.name, userDto.email, userDto.password);
    try {
      await this.userRepository.save(user);

      return HttpResponse.created(user);
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { CreateUserUseCase };
