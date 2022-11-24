import { ITaskRepository, TFiltersQuery } from '@models/task';
import { CustomError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

class FindWithFiltersUseCase {
  constructor (private readonly repository: ITaskRepository) {}

  async execute (userId: string, filters: TFiltersQuery): Promise<IHttpResponse> {
    try {
      const tasks = await this.repository.findWithFilters(userId, filters);

      return HttpResponse.ok(tasks);
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }

      return HttpResponse.serverError(error);
    }
  }
}

export { FindWithFiltersUseCase };
