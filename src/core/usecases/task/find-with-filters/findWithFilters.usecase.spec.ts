import { TaskRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { FindWithFiltersUseCase } from './findWithFilters.usecase';

describe('[UseCase] Find With Filters', () => {
  const makeSut = () => {
    const taskRepository = new TaskRepositoryMock();
    const sut = new FindWithFiltersUseCase(taskRepository);
    return { sut, taskRepository };
  };

  it('should return a list of tasks', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { body, statusCode } = await sut.execute(user.id, {});

    expect(statusCode).toBe(200);
    expect(body.total).toBe(1);
  });

  it('should return a list of tasks with one filter', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { body, statusCode } = await sut.execute(user.id, {
      title: user.tasks[0].title
    });

    expect(statusCode).toBe(200);
    expect(body.total).toBe(1);
  });
  it('should return a list of tasks with filters', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { body, statusCode } = await sut.execute(user.id, {
      title: user.tasks[0].title,
      done: !user.tasks[0].done
    });

    expect(statusCode).toBe(200);
    expect(body.total).toBe(1);
  });

  it('should return 404 if user not found', async () => {
    const { sut } = makeSut();
    const { statusCode } = await sut.execute('invalid_id', {});

    expect(statusCode).toBe(400);
  });

  it('should return 200 if returns empty tasks', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];

    const { statusCode, body } = await sut.execute(user.id, {
      title: 'invalid_title'
    });

    expect(statusCode).toBe(200);
    expect(body.total).toBe(0);
  });
});