import { cacheConfig } from '@configs/cache';
import { UserRequestDto } from '@models/user/user.dtos';
import { IUserRepository } from '@models/user/userRepository.interface';
import { IRepositoryCache } from '@presentation/cache/repositoryCache.interface';
import { CustomError, InvalidParamError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';
import { regexEmail, regexName } from '@presentation/helpers/validations';

class UpdateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly cacheRepository: IRepositoryCache
  ) {}

  async execute (userId: string, userDto: Partial<UserRequestDto>): Promise<IHttpResponse> {
    try {
      const keyCache = `${cacheConfig.prefix.user}-${userId}`;
      const user = await this.userRepository.findById(userId);
      if (!user) { throw new NotFoundError('User') }

      if (userDto.name !== undefined) {
        if (!userDto.name.match(regexName)) { throw new InvalidParamError('Name') }
        user.name = userDto.name;
      }

      if (userDto.email !== undefined) {
        if (!userDto.email.match(regexEmail)) { throw new InvalidParamError('Email') }
        user.email = userDto.email;
      }

      if (userDto.password?.trim() || userDto.password_confirm?.trim()) {
        if (userDto.password !== userDto.password_confirm) {
          throw new InvalidParamError('Password does not match');
        }
        if (userDto.password!.length < 6) {
          throw new InvalidParamError('Password must have at least 6 characters');
        }
        user.password = userDto.password!;
      }

      await this.userRepository.update(user);
      await this.cacheRepository.set(keyCache, user);

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
