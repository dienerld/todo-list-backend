import { ITaskRepository } from '@models/task/taskRepository.interface';
import { IRepositoryCache } from '@presentation/cache/repositoryCache.interface';
import { CustomError, MissingParamError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers/httpResponse';

class DeleteTaskUseCase {
  constructor (
    private readonly repository: ITaskRepository,
    private readonly repositoryCache: IRepositoryCache
  ) {}

  async execute (userId: string, taskId: string): Promise<IHttpResponse> {
    try {
      if (!userId) { throw new MissingParamError('userId') };
      if (!taskId) { throw new MissingParamError('taskId') };

      const task = await this.repository.findById(taskId, userId);
      if (!task) { throw new NotFoundError('Task') };

      await this.repository.delete(taskId);
      await this.repositoryCache.delete(userId);

      return HttpResponse.noContent();
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { DeleteTaskUseCase };
