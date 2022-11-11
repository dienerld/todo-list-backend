import { User } from '@models/user/user.model';
import { DatabaseMock } from '../../../__tests__/repositories/databaseMock';
import { FindAllTaskUseCase } from './findAllTask.usecase';

describe('[UseCase] Find All Tasks', () => {
  it('Should return all tasks', async () => {
    const sut = new FindAllTaskUseCase(DatabaseMock.db());

    const { body: tasks } = await sut.execute('any_id');

    expect(tasks).toHaveLength(1);
  });

  it('Should return empty array if user has no tasks', async () => {
    const sut = new FindAllTaskUseCase(DatabaseMock.db());
    const user = new User('John Doe', 'john@doe.com', '123456');
    DatabaseMock.users.push(user);

    const { body: tasks } = await sut.execute(user.id);

    expect(tasks).toHaveLength(0);
  });

  it('Should return 404 if user not found', async () => {
    const sut = new FindAllTaskUseCase(DatabaseMock.db());

    const { statusCode } = await sut.execute('invalid_id');

    expect(statusCode).toBe(400);
  });
});
