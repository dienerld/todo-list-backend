import { ITaskRepository } from '@models/task/taskRepository.interface';
import { CustomError } from '@presentation/errors';
import { IHttpResponse, HttpResponse } from '@presentation/helpers';

class FindAllTaskUseCase {
  constructor (private readonly repository: ITaskRepository) {}

  async execute (userId: string): Promise<IHttpResponse> {
    try {
      const result = await this.repository.findAll(userId);

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
