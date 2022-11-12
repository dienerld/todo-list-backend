import { TaskRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { UpdateTaskUseCase } from './updateTask.usecase';

describe('[UseCase] Update Task', () => {
  const makeSut = () => {
    const repository = new TaskRepositoryMock();
    const sut = new UpdateTaskUseCase(repository);
    return { sut, repository };
  };
  it('should update a task', async () => {
    const { sut } = makeSut();
    const [task] = UsersMock[0].tasks;

    const { statusCode } = await sut.execute(task.user_id, task.id, {
      title: 'any_title'
    });

    expect(statusCode).toBe(204);
  });

  it('should return 404 if task not found', async () => {
    const { sut } = makeSut();
    const [task] = UsersMock[0].tasks;

    const { statusCode, body } = await sut.execute(task.user_id, task.id + '1', {
      title: 'any_title'
    });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'NotFoundError');
    expect(body).toHaveProperty('message', 'Task not found');
  });
  it('should return 404 if user not found', async () => {
    const { sut } = makeSut();
    const [task] = UsersMock[0].tasks;

    const { statusCode, body } = await sut.execute(task.user_id + '1', task.id, {
      title: 'any_title'
    });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'NotFoundError');
    expect(body).toHaveProperty('message', 'User not found');
  });
});
