import { ITaskRepository } from '@models/task/taskRepository.interface';
import { TaskRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { FindAllTaskUseCase } from './findAllTask.usecase';

describe('[UseCase] Find All Tasks', () => {
  let repository: ITaskRepository;

  beforeEach(() => {
    repository = new TaskRepositoryMock();
  });
  it('Should return all tasks', async () => {
    const sut = new FindAllTaskUseCase(repository);

    const { body: tasks } = await sut.execute('any_id');

    expect(tasks.tasks).toHaveLength(1);
  });

  it('Should return empty array if user has no tasks', async () => {
    const sut = new FindAllTaskUseCase(repository);
    const user = UsersMock[0];
    await repository.delete(user.tasks[0].id);

    const { body: tasks } = await sut.execute(user.id);

    expect(tasks.tasks).toHaveLength(0);
  });

  it('Should return 404 if user not found', async () => {
    const sut = new FindAllTaskUseCase(repository);

    const { statusCode } = await sut.execute('invalid_id');

    expect(statusCode).toBe(400);
  });
});
