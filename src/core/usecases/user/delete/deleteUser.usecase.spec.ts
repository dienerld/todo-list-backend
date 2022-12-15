import { IUserRepository } from '@models/user/userRepository.interface';
import { RedisCacheMock, resetUsers, UserRepositoryMock, UsersMock } from '../../../__tests__/repositories';
import { DeleteUserUsecase } from './deleteUser.usecase';

describe('[Use case] Delete User', () => {
  const makeSut = () => {
    const userRepository = new UserRepositoryMock();
    const cacheRepository = new RedisCacheMock();
    const sut = new DeleteUserUsecase(userRepository, cacheRepository);

    return { userRepository, sut, cacheRepository };
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

  it('should return a 404 error if user not found', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];

    const { body, statusCode } = await sut.execute(user.id + '1');

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
  });

  it('should return a 500 error if repository not provided', async () => {
    const { cacheRepository } = makeSut();
    const useCase = new DeleteUserUsecase(undefined as unknown as IUserRepository, cacheRepository);
    const user = UsersMock[0];

    const { body, statusCode } = await useCase.execute(user.id);

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('message');
  });
});
