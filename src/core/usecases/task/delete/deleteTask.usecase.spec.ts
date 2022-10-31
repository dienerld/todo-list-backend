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

  it('should return badRequest if userId is not provided', async () => {
    const deleteTaskUseCase = new DeleteTaskUseCase(DatabaseMock.db());
    const { statusCode, body } = await deleteTaskUseCase.execute('', 'valid_id');

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'Missing param: userId' });
  });

  it('should return badRequest if taskId is not provided', async () => {
    const deleteTaskUseCase = new DeleteTaskUseCase(DatabaseMock.db());
    const { statusCode, body } = await deleteTaskUseCase.execute('any_id', '');

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'Missing param: taskId' });
  });

  it('should return badRequest if user is not found', async () => {
    const deleteTaskUseCase = new DeleteTaskUseCase(DatabaseMock.db());
    const { statusCode, body } = await deleteTaskUseCase.execute('invalid_id', 'valid_id');

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'User not found' });
  });

  it('should return badRequest if task is not found', async () => {
    const deleteTaskUseCase = new DeleteTaskUseCase(DatabaseMock.db());
    const { statusCode, body } = await deleteTaskUseCase.execute('any_id', 'invalid_id');

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'Task not found' });
  });

  it('should return serverError if database throws', async () => {
    const databaseMock = DatabaseMock.db();
    jest.spyOn(databaseMock, 'getDatabase').mockImplementation(() => { throw new Error(); });

    const deleteTaskUseCase = new DeleteTaskUseCase(databaseMock);
    const { statusCode, body } = await deleteTaskUseCase.execute('any_id', 'valid_id');

    expect(statusCode).toBe(500);
    expect(body).toEqual({ message: 'Internal server error' });
  });
});
