import { IDatabase } from '@database/index';
import { Task } from '@models/task/task.model';
import { User } from '@models/user/user.model';
import { DeleteTaskUseCase } from './deleteTask.usecase';

class DatabaseMock {
  static users: User[] = [
    User.create({
      id: 'any_id',
      name: 'John Doe',
      email: 'any_mail@mail.com',
      password: 'any_password',
      tasks: [
        Task.create({
          id: 'valid_id',
          title: 'test',
          date: new Date(),
          hour: '12:00',
          done: true,
          hidden: false
        })
      ]
    })
  ];

  static db (): IDatabase {
    function saveDatabase (data: User[]) { DatabaseMock.users = data; };
    function getDatabase (): User[] { return DatabaseMock.users; }
    return { getDatabase, saveDatabase };
  }
}

describe('[UseCase] Delete', () => {
  it('should delete task with correct params', async () => {
    const deleteTaskUseCase = new DeleteTaskUseCase(DatabaseMock.db());
    await deleteTaskUseCase.execute('any_id', 'valid_id');
    expect(DatabaseMock.users[0].tasks.length).toBe(0);
  });
});
