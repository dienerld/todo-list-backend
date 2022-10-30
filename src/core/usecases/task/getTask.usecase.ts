import { getDatabase } from '@database/index';

type TQuery = true | false | string;

class GetTaskUseCase {
  async execute (userId: string, ...querys: TQuery[]) {
    try {
      const users = getDatabase();

      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        throw new Error('User not found');
      }
      const tasks = users[userIndex].tasks.filter(task => querys.some(query =>
        // @ts-expect-error
        // eslint-disable-next-line eqeqeq
        task.title.includes(query) || task.hidden == query)
      );

      return tasks;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { GetTaskUseCase };
