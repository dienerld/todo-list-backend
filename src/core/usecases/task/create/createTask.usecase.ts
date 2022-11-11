import { IDatabase } from '@database/index';
import { TaskRequestDto } from '@models/task/task.dtos';
import { Task } from '@models/task/task.model';
import { CustomError, MissingParamError, NotFoundError } from '@presentation/errors';
import { IHttpResponse, HttpResponse } from '@presentation/helpers';

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
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { CreateTaskUseCase };
