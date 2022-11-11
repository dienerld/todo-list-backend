import { Task } from '@core/models/task/task.model';
import { HttpResponse, IHttpResponse } from '@core/presentation/helpers';
import { IDatabase } from '@database/index';
import { CustomError, NotFoundError } from '@presentation/errors';

class FindAllTaskUseCase {
  constructor (private database: IDatabase) {}
  async execute (userId: string): Promise<IHttpResponse> {
    try {
      const users = this.database.getDatabase();
      const user = users.find(user => user.id === userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      const tasks = user.tasks.sort((a, b) => {
        a.date.setHours(0, 0, 0, 0);
        b.date.setHours(0, 0, 0, 0);
        const daysDiff = a.date.getTime() - b.date.getTime();
        if (daysDiff !== 0) {
          return daysDiff;
        }
        const [aHour, aMinute] = a.hour.split(':');
        const [bHour, bMinute] = b.hour.split(':');
        const hourDiff = Number(aHour) - Number(bHour);
        if (hourDiff !== 0) {
          return hourDiff;
        }
        return Number(aMinute) - Number(bMinute);
      });
      return HttpResponse.ok<Task[]>(tasks);
    } catch (err) {
      if (err instanceof CustomError) {
        return HttpResponse.badRequest(err);
      }
      return HttpResponse.serverError(err);
    }
  }
}

export { FindAllTaskUseCase };
