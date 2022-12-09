import { TaskRepositoryMock, UsersMock, RedisCacheMock } from '../../../__tests__/repositories/databaseMock';
import { FindAllTaskUseCase } from './findAllTask.usecase';

describe('[UseCase] Find All Tasks', () => {
  const makeSut = () => {
    const repository = new TaskRepositoryMock();
    const repositoryCache = new RedisCacheMock();
    const sut = new FindAllTaskUseCase(repository, repositoryCache);

    return { sut, repository, repositoryCache };
  };

  it('Should return all tasks', async () => {
    const { sut } = makeSut();

    const { body: tasks } = await sut.execute('any_id');

    expect(tasks.tasks).toHaveLength(1);
  });

  it('Should return empty array if user has no tasks', async () => {
    const { sut, repository } = makeSut();
    const user = UsersMock[0];
    await repository.delete(user.tasks[0].id);

    const { body: tasks } = await sut.execute(user.id);

    expect(tasks.tasks).toHaveLength(0);
  });

  it('Should return 404 if user not found', async () => {
    const { sut } = makeSut();

    const { statusCode } = await sut.execute('invalid_id');

    expect(statusCode).toBe(400);
  });
});
