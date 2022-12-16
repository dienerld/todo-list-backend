import { cacheConfig } from '@configs/cache';
import { IUserRepository } from '@models/user';
import { IRepositoryCache } from '@presentation/cache/repositoryCache.interface';
import { CustomError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

class FindUserUseCase {
  constructor (private readonly userRepository: IUserRepository,
    private readonly cacheRepository: IRepositoryCache
  ) {}

  async execute (userId: string): Promise<IHttpResponse> {
    try {
      const keyCache = `${cacheConfig.prefix.user}-${userId}`;
      const userCache = await this.cacheRepository.get(keyCache);
      if (userCache) { return HttpResponse.ok(userCache) }

      const user = await this.userRepository.findByIdWithTasks(userId);
      if (!user) { throw new NotFoundError('User') }

      await this.cacheRepository.set(keyCache, user, cacheConfig.expiresInMin);

      return HttpResponse.ok(user);
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { FindUserUseCase };
