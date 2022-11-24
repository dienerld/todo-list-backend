
import { ITaskRepository } from '@models/task/taskRepository.interface';
import { TaskRepositoryMock } from '../../../__tests__/repositories/databaseMock';
import { CreateTaskUseCase } from './createTask.usecase';

describe('[UseCase] Create Task', () => {
  let repository: ITaskRepository;

  beforeEach(() => {
    repository = new TaskRepositoryMock();
  });
  it('should create task with correct params', async () => {
    const createTaskUseCase = new CreateTaskUseCase(repository);
    const { body: task } = await createTaskUseCase.execute('any_id', {
      title: 'Test',
      date: new Date(),
      hour: '12:00'
    });

    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Test');
  });

  it('should return badRequest if userId is not provided', async () => {
    const createTaskUseCase = new CreateTaskUseCase(repository);
    const { statusCode } = await createTaskUseCase.execute('', {
      title: 'Test',
      date: new Date(),
      hour: '12:00'
    });

    expect(statusCode).toBe(400);
  });

  it('should return badRequest if title is not provided', async () => {
    const createTaskUseCase = new CreateTaskUseCase(repository);
    const { statusCode } = await createTaskUseCase.execute('1', {
      title: '',
      date: new Date(),
      hour: '12:00'
    });

    expect(statusCode).toBe(400);
  });

  it('should return badRequest if date is not provided', async () => {
    const createTaskUseCase = new CreateTaskUseCase(repository);
    const { statusCode } = await createTaskUseCase.execute('1', {
      title: 'Test',
      date: undefined as unknown as Date,
      hour: '12:00'
    });

    expect(statusCode).toBe(400);
  });

  it('should return badRequest if hour is not provided', async () => {
    const createTaskUseCase = new CreateTaskUseCase(repository);
    const { statusCode } = await createTaskUseCase.execute('1', {
      title: 'Test',
      date: new Date(),
      hour: ''
    });

    expect(statusCode).toBe(400);
  });

  it('should return serverError if user is not found', async () => {
    const createTaskUseCase = new CreateTaskUseCase(repository);
    const { statusCode } = await createTaskUseCase.execute('2', {
      title: 'Test',
      date: new Date(),
      hour: '12:00'
    });

    expect(statusCode).toBe(400);
  });

  it('should return serverError if database throws', async () => {
    const createTaskUseCase = new CreateTaskUseCase(undefined as unknown as ITaskRepository);
    jest.spyOn(repository, 'save').mockImplementationOnce(() => {
      throw new Error();
    });
    const { statusCode } = await createTaskUseCase.execute('1', {
      title: 'Test',
      date: new Date(),
      hour: '12:00'
    });

    expect(statusCode).toBe(500);
  });
});
