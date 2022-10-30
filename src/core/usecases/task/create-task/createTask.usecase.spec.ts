import { IDatabase } from '@database/index';
import { User } from '@models/user/user.model';
import { CreateTaskUseCase } from './createTask.usecase';

class DatabaseMock {
  static users: User[] = [
    User.create({
      id: '1',
      name: 'John Doe',
      email: 'any_mail@mail.com',
      password: 'any_password',
      tasks: []
    })
  ];

  static db (): IDatabase {
    function saveDatabase (data: User[]) {
      DatabaseMock.users = data;
    };

    function getDatabase (): User[] {
      return DatabaseMock.users;
    }
    return { getDatabase, saveDatabase };
  }
}

describe('[UseCase] Create Task', () => {
  it('should create task with correct params', async () => {
    const createTaskUseCase = new CreateTaskUseCase(DatabaseMock.db());
    const task = await createTaskUseCase.execute('1', {
      title: 'Test',
      date: new Date(),
      hour: '12:00'
    });

    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Test');
    expect(DatabaseMock.users[0].tasks[0]).toHaveProperty('title', 'Test');
  });
});
