import { IDatabase } from '@database/index';
import { TaskRequestDto } from '@models/task/task.dtos';
import { Task } from '@models/task/task.model';
import { InvalidParamError } from '../../../presentation/errors/invalidParamError';
import { MissingParamError } from '../../../presentation/errors/missingParamsError';
import { NotFoundError } from '../../../presentation/errors/notFoundError';
import { HttpResponse, IHttpResponse } from '../../../presentation/helpers/httpResponse';

class CreateTaskUseCase {
  constructor (private readonly database: IDatabase) {}

  async execute (userId: string, taskDto: TaskRequestDto): Promise<IHttpResponse> {
    if (!userId) {
      return HttpResponse.badRequest(new MissingParamError('userId'));
    }

    try {
      const users = this.database.getDatabase();
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
        throw new NotFoundError('User');
      }

      const task = new Task(taskDto.title, taskDto.date, taskDto.hour);

      users[userIndex].tasks.push(task);

      this.database.saveDatabase(users);
      return HttpResponse.created<Task>(task);
    } catch (error) {
      if (
        error instanceof MissingParamError ||
        error instanceof InvalidParamError ||
        error instanceof NotFoundError
      ) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError();
    }
  }
}

export { CreateTaskUseCase };
