import { TaskUpdateRequestDto, ITaskRepository } from '@models/task';
import { CustomError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

class UpdateTaskUseCase {
  constructor (private readonly taskRepository: ITaskRepository) {}

  async execute (userId: string, taskId: string, taskDto: Partial<TaskUpdateRequestDto>): Promise<IHttpResponse> {
    try {
      const task = await this.taskRepository.findById(taskId, userId);
      if (!task) { throw new NotFoundError('Task') }

      task.update(taskDto);
      await this.taskRepository.update(userId, task);

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
