import { IDatabase } from '@database/index';
import { NotFoundError } from '../../../presentation/errors/notFoundError';

class FindAllTaskUseCase {
  constructor (private database: IDatabase) {}
  async execute (userId: string) {
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
      return tasks;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export { FindAllTaskUseCase };
