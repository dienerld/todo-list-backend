import { cacheConfig } from '@configs/cache';
import { ITaskRepository, TResultFind } from '@models/task';
import { TaskRepositoryMock, UsersMock, RedisCacheMock } from '../../../__tests__/repositories';
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

  it('should return all tasks in cache', async () => {
    const { sut, repositoryCache } = makeSut();
    const user = UsersMock[0];
    const keyCache = `${cacheConfig.prefix.tasks}-${user.id}`;
    await repositoryCache.set<TResultFind>(
      keyCache,
      { tasks: user.tasks, total: user.tasks.length },
      cacheConfig.expiresInMin
    );

    await sut.execute(user.id);
    const { body: tasks } = await sut.execute(user.id);

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

  it('Should return 500 if database repository not provided', async () => {
    const { repositoryCache } = makeSut();
    const sut = new FindAllTaskUseCase(null as unknown as ITaskRepository, repositoryCache);
    const { statusCode } = await sut.execute('any_id');

    expect(statusCode).toBe(500);
  });

  it('Should return 500 if cache repository not provided', async () => {
    const { repository } = makeSut();
    const sut = new FindAllTaskUseCase(repository, null as unknown as RedisCacheMock);
    const { statusCode } = await sut.execute('any_id');

    expect(statusCode).toBe(500);
  });

  it('Should return 500 if repository throws', async () => {
    const { sut, repository } = makeSut();
    jest.spyOn(repository, 'findAll').mockImplementationOnce(() => {
      throw new Error();
    });
    const { statusCode } = await sut.execute('any_id');

    expect(statusCode).toBe(500);
  });

  it('Should return 500 if cache repository throws', async () => {
    const { sut, repositoryCache } = makeSut();
    jest.spyOn(repositoryCache, 'set').mockImplementationOnce(() => {
      throw new Error();
    });
    const { statusCode } = await sut.execute('any_id');

    expect(statusCode).toBe(500);
  });
});
