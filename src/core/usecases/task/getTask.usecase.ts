import { ITaskRepository } from '@models/task/taskRepository.interface';
import { CustomError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

type TQuery = true | false | string;

class GetTaskUseCase {
  constructor (private readonly repository: ITaskRepository) {}

  async execute (userId: string, ...querys: TQuery[]): Promise<IHttpResponse> {
    try {
      const tasks = await this.repository.findAll(userId);

      return HttpResponse.ok(tasks);
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }

      return HttpResponse.serverError(error);
    }
  }
}

export { GetTaskUseCase };
