import { FindUserUseCase } from './findUser.usecase';
import { UserRepositoryMock, UsersMock, RedisCacheMock } from '../../../__tests__/repositories';
import { IUserRepository } from '@models/user';
import { cacheConfig } from '@configs/cache';

describe('[Use Case] Find User', () => {
  const makeSut = () => {
    const userRepository = new UserRepositoryMock();
    const cacheRepository = new RedisCacheMock();
    const sut = new FindUserUseCase(userRepository, cacheRepository);

    return { userRepository, sut, cacheRepository };
  };

  it('should return a user with tasks', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];

    const { body, statusCode } = await sut.execute(user.id);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('id');
  });

  it('Should return a user with tasks from cache', async () => {
    const { sut, cacheRepository } = makeSut();
    const user = UsersMock[0];

    await cacheRepository.set(`${cacheConfig.prefix.user}-${user.id}`, user);
    await sut.execute(user.id);
    const { body, statusCode } = await sut.execute(user.id);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('id');
  });

  it('should return a 404 error if user not found', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { body, statusCode } = await sut.execute(user.id + '1');

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
  });

  it('should return a 500 error if database repository not provided', async () => {
    const { cacheRepository } = makeSut();
    const useCase = new FindUserUseCase(undefined as unknown as IUserRepository, cacheRepository);
    const user = UsersMock[0];
    const { body, statusCode } = await useCase.execute(user.id);

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('message');
  });

  it('should return a 500 error if cache repository not provided', async () => {
    const { userRepository } = makeSut();
    const useCase = new FindUserUseCase(userRepository, undefined as unknown as RedisCacheMock);
    const user = UsersMock[0];
    const { body, statusCode } = await useCase.execute(user.id);

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('message');
  });
});
