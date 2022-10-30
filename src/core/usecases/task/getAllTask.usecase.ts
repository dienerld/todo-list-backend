import { getDatabase } from '@database/index';

class GetAllTaskUseCase {
  async execute (userId: string) {
    try {
      const users = getDatabase();
      const user = users.find(user => user.id === userId);
      if (!user) {
        throw new Error('User not found');
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

export { GetAllTaskUseCase };
