import { IDatabase } from '@database/index';
import { InvalidParamError } from '../../../presentation/errors/invalidParamError';
import { MissingParamError } from '../../../presentation/errors/missingParamsError';
import { NotFoundError } from '../../../presentation/errors/notFoundError';
import { HttpResponse, IHttpResponse } from '../../../presentation/helpers/httpResponse';

class DeleteTaskUseCase {
  constructor (private database: IDatabase) {}

  async execute (userId: string, taskId: string): Promise<IHttpResponse> {
    if (!userId) return HttpResponse.badRequest(new MissingParamError('userId'));
    if (!taskId) return HttpResponse.badRequest(new MissingParamError('taskId'));

    try {
      const users = this.database.getDatabase();
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
        return HttpResponse.badRequest(new NotFoundError('User'));
      }

      const taskIndex = users[userIndex].tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) {
        return HttpResponse.badRequest(new NotFoundError('Task'));
      }

      users[userIndex].tasks.splice(taskIndex, 1);
      this.database.saveDatabase(users);

      return HttpResponse.noContent();
    } catch (error) {
      if (error instanceof MissingParamError || error instanceof InvalidParamError) {
        return HttpResponse.badRequest(error);
      }

      return HttpResponse.serverError();
    }
  }
}

export { DeleteTaskUseCase };
