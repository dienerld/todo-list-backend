import { TaskRequestDto } from '@models/task/task.dtos';
import { Task } from '@models/task/task.model';
import { ITaskRepository } from '@models/task/taskRepository.interface';
import { CustomError, MissingParamError } from '@presentation/errors';
import { IHttpResponse, HttpResponse } from '@presentation/helpers';

class CreateTaskUseCase {
  constructor (private readonly repository: ITaskRepository) {}

  async execute (userId: string, taskDto: TaskRequestDto): Promise<IHttpResponse> {
    try {
      if (!userId) { throw new MissingParamError('userId'); }

      if (!taskDto) { throw new MissingParamError('taskDto'); }

      const task = Task.create(taskDto.title, taskDto.date, taskDto.hour, userId);

      await this.repository.save(userId, task);

      return HttpResponse.created(task);
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { CreateTaskUseCase };
