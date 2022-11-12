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
});
