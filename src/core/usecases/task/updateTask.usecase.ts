import { TaskUpdateRequestDto } from '@models/task/task.dtos';
import { ITaskRepository } from '@models/task/taskRepository.interface';
import { CustomError, NotFoundError, UnauthorizedError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

class UpdateTaskUseCase {
  constructor (private readonly taskRepository: ITaskRepository) {}

  async execute (userId: string, taskId: string, taskDto: Partial<TaskUpdateRequestDto>): Promise<IHttpResponse> {
    try {
      const task = await this.taskRepository.findById(taskId);
      if (task.user_id !== userId) {
        throw new UnauthorizedError();
      }
      if (!task) { throw new NotFoundError('Task'); }

      task.update(taskDto);
      await this.taskRepository.update(task);
      console.log('depois');
      return HttpResponse.ok(task);
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }

      return HttpResponse.serverError(error);
    }
  }
}
export { UpdateTaskUseCase };
