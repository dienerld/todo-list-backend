import { TaskUpdateRequestDto } from '@models/task/task.dtos';
import { ITaskRepository } from '@models/task/taskRepository.interface';
import { IRepositoryCache } from '@models/task/taskRepositoryCache.interface';
import { CustomError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

class UpdateTaskUseCase {
  constructor (
    private readonly taskRepository: ITaskRepository,
    private readonly repositoryCache: IRepositoryCache
  ) {}

  async execute (userId: string, taskId: string, taskDto: Partial<TaskUpdateRequestDto>): Promise<IHttpResponse> {
    try {
      const task = await this.taskRepository.findById(taskId, userId);
      if (!task) { throw new NotFoundError('Task') }

      task.update(taskDto);
      await this.taskRepository.update(userId, task);
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
export { UpdateTaskUseCase };
