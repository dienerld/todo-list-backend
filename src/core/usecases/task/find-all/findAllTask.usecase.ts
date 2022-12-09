import { cacheConfig } from '@configs/cache';
import { ITaskRepository, TResultFind } from '@models/task/taskRepository.interface';
import { IRepositoryCache } from '@presentation/cache/repositoryCache.interface';
import { CustomError } from '@presentation/errors';
import { IHttpResponse, HttpResponse } from '@presentation/helpers';

class FindAllTaskUseCase {
  constructor (
    private readonly repository: ITaskRepository,
    private readonly repositoryCache: IRepositoryCache
  ) {}

  async execute (userId: string): Promise<IHttpResponse> {
    try {
      const cached = await this.repositoryCache.get<TResultFind>(userId);
      if (cached) { return HttpResponse.ok(cached) }

      const result = await this.repository.findAll(userId);
      await this.repositoryCache.set(userId, result, cacheConfig.expiresInMin);

      return HttpResponse.ok(result);
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { FindAllTaskUseCase };
