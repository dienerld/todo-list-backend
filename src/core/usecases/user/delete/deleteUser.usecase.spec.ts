import { IUserRepository } from '@models/user/userRepository.interface';
import { IRepositoryCache } from '@presentation/cache/repositoryCache.interface';
import {
  RedisCacheMock, resetUsers,
  UserRepositoryMock, UsersMock
} from '../../../__tests__/repositories';
import { DeleteUserUsecase } from './deleteUser.usecase';

describe('[Use case] Delete User', () => {
  const makeSut = () => {
    const repository = new UserRepositoryMock();
    const cacheRepository = new RedisCacheMock();
    const sut = new DeleteUserUsecase(repository, cacheRepository);

    return { repository, sut, cacheRepository };
  };

  beforeEach(() => {
    resetUsers();
  });

  it('should return a 204 status code if user is deleted', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];

    const { statusCode } = await sut.execute(user.id);

    expect(statusCode).toBe(204);
  });

  it('should return a 400 error if user not found', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];

    const { body, statusCode } = await sut.execute(user.id + '1');
    console.log(body);

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message', 'User not found');
  });

  it('should return a 500 error if database repository not provided', async () => {
    const { cacheRepository } = makeSut();
    const useCase = new DeleteUserUsecase(undefined as unknown as IUserRepository, cacheRepository);
    const user = UsersMock[0];

    const { body, statusCode } = await useCase.execute(user.id);

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('message');
  });

  it('should return a 500 error if cache repository not provided', async () => {
    const { repository } = makeSut();
    const useCase = new DeleteUserUsecase(repository, undefined as unknown as IRepositoryCache);
    const user = UsersMock[0];

    const { body, statusCode } = await useCase.execute(user.id);

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('message');
  });

  it('should return a 500 error if database repository throws', async () => {
    const { sut, repository } = makeSut();
    const user = UsersMock[0];
    jest.spyOn(repository, 'findById').mockImplementationOnce(() => { throw new Error() });

    const { body, statusCode } = await sut.execute(user.id);

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('message');
  });

  it('should return a 500 error if cache repository throws', async () => {
    const { sut, cacheRepository } = makeSut();
    const user = UsersMock[0];
    jest.spyOn(cacheRepository, 'delete').mockImplementationOnce(() => { throw new Error() });

    const { body, statusCode } = await sut.execute(user.id);

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('message');
  });
});
