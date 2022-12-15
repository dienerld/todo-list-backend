import { RedisCacheMock, TaskRepositoryMock, UsersMock } from '../../../__tests__/repositories';
import { DeleteTaskUseCase } from './deleteTask.usecase';

describe('[UseCase] Delete', () => {
  const makeSut = () => {
    const repository = new TaskRepositoryMock();
    const repositoryCache = new RedisCacheMock();
    const sut = new DeleteTaskUseCase(repository, repositoryCache);

    return { sut, repository, repositoryCache };
  };
  it('should delete task with correct params', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    await sut.execute(user.id, user.tasks[0].id);

    expect(UsersMock[0].tasks.length).toBe(0);
  });

  it('should return badRequest if userId is not provided', async () => {
    const { sut } = makeSut();
    const { statusCode, body } = await sut.execute('', 'valid_id');

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message', 'Missing param: userId');
  });

  it('should return badRequest if taskId is not provided', async () => {
    const { sut } = makeSut();
    const { statusCode, body } = await sut.execute('any_id', '');

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message', 'Missing param: taskId');
  });

  it('should return badRequest if user is not found', async () => {
    const { sut } = makeSut();
    const { statusCode, body } = await sut.execute('invalid_id', 'valid_id');

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message', 'User not found');
  });

  it('should return badRequest if task is not found', async () => {
    const { sut } = makeSut();
    const { statusCode, body } = await sut.execute('any_id', 'invalid_id');

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message', 'Task not found');
  });

  it('should return serverError if database throws', async () => {
    const { repository, repositoryCache } = makeSut();
    const databaseMock = repository;
    jest.spyOn(databaseMock, 'findById').mockImplementation(() => { throw new Error() });

    const deleteTaskUseCase = new DeleteTaskUseCase(databaseMock, repositoryCache);
    const { statusCode, body } = await deleteTaskUseCase.execute('any_id', 'valid_id');

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('error', 'Error');
  });
});
