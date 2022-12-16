
import { TaskRequestDto } from '@models/task/task.dtos';
import { ITaskRepository } from '@models/task/taskRepository.interface';
import { TaskRepositoryMock, RedisCacheMock } from '../../../__tests__/repositories';
import { CreateTaskUseCase } from './createTask.usecase';

describe('[UseCase] Create Task', () => {
  const makeSut = () => {
    const repository = new TaskRepositoryMock();
    const repositoryCache = new RedisCacheMock();
    const sut = new CreateTaskUseCase(repository, repositoryCache);
    return { sut, repository, repositoryCache };
  };

  let repository: ITaskRepository;

  beforeEach(() => {
    repository = new TaskRepositoryMock();
  });
  it('should create task with correct params', async () => {
    const { sut } = makeSut();
    const { body: task } = await sut.execute('any_id', {
      title: 'Test',
      date: new Date(),
      hour: '12:00'
    });

    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Test');
  });

  it('should return badRequest if userId is not provided', async () => {
    const { sut } = makeSut();
    const { statusCode } = await sut.execute('', {
      title: 'Test',
      date: new Date(),
      hour: '12:00'
    });

    expect(statusCode).toBe(400);
  });

  it('should return badRequest if taskDto is not provided', async () => {
    const { sut } = makeSut();
    const { statusCode, body } = await sut.execute('1', undefined as unknown as TaskRequestDto);

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message', 'Missing param: taskDto');
  });

  it('should return badRequest if title is not provided', async () => {
    const { sut } = makeSut();
    const { statusCode } = await sut.execute('1', {
      title: '',
      date: new Date(),
      hour: '12:00'
    });

    expect(statusCode).toBe(400);
  });

  it('should return badRequest if date is not provided', async () => {
    const { sut } = makeSut();
    const { statusCode } = await sut.execute('1', {
      title: 'Test',
      date: undefined as unknown as Date,
      hour: '12:00'
    });

    expect(statusCode).toBe(400);
  });

  it('should return badRequest if hour is not provided', async () => {
    const { sut } = makeSut();
    const { statusCode } = await sut.execute('1', {
      title: 'Test',
      date: new Date(),
      hour: ''
    });

    expect(statusCode).toBe(400);
  });

  it('should return serverError if user is not found', async () => {
    const { sut } = makeSut();
    const { statusCode } = await sut.execute('2', {
      title: 'Test',
      date: new Date(),
      hour: '12:00'
    });

    expect(statusCode).toBe(400);
  });

  it('should return serverError if database throws', async () => {
    const { repositoryCache } = makeSut();
    const createTaskUseCase = new CreateTaskUseCase(
      undefined as unknown as ITaskRepository, repositoryCache
    );
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
