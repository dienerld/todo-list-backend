import { UserRequestDto } from '@models/user/user.dtos';
import { IUserRepository } from '@models/user/userRepository.interface';
import { CustomError, InvalidParamError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';
import { regexEmail, regexName } from '@presentation/helpers/validations';

class UpdateUserUseCase {
  constructor (private readonly userRepository: IUserRepository) {}

  async execute (userId: string, userDto: Partial<UserRequestDto>): Promise<IHttpResponse> {
    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new NotFoundError('User not found');
      }
      if (userDto.name !== undefined) {
        if (!userDto.name.match(regexName)) { throw new InvalidParamError('Name') }
        user.name = userDto.name;
      }

      if (userDto.email !== undefined) {
        if (!userDto.email.match(regexEmail)) { throw new InvalidParamError('Email') }
        user.email = userDto.email;
      }

      if (userDto.password !== undefined || userDto.password_confirm !== undefined) {
        if (userDto.password !== userDto.password_confirm) {
          throw new InvalidParamError('Password does not match');
        }
        user.password = userDto.password!;
      }

      await this.userRepository.update(user);
      return HttpResponse.noContent();
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { UpdateUserUseCase };
