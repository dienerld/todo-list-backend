import { cacheConfig } from '@configs/cache';
import { IUserRepository } from '@models/user/userRepository.interface';
import { IRepositoryCache } from '@presentation/cache/repositoryCache.interface';
import { CustomError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

class DeleteUserUsecase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly cacheRepository: IRepositoryCache
  ) {}

  async execute (userId: string): Promise<IHttpResponse> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) { throw new NotFoundError('User') }
      await Promise.all([
        this.userRepository.delete(userId),
        this.cacheRepository.delete(`${cacheConfig.prefix.tasks}-${userId}`),
        this.cacheRepository.delete(`${cacheConfig.prefix.user}-${userId}`)
      ]);

      return HttpResponse.noContent();
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { DeleteUserUsecase };
