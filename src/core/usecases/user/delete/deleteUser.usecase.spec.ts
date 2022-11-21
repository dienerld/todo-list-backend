import { IUserRepository } from '@models/user/userRepository.interface';
import { resetUsers, UserRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { DeleteUserUsecase } from './deleteUser.usecase';

describe('[Use case] Delete User', () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    resetUsers();
  });

  it('should return a 204 status code if user is deleted', async () => {
    const useCase = new DeleteUserUsecase(userRepository);
    const user = UsersMock[0];

    const { statusCode } = await useCase.execute(user.id);

    expect(statusCode).toBe(204);
  });

  it('should return a 404 error if user not found', async () => {
    const useCase = new DeleteUserUsecase(userRepository);
    const user = UsersMock[0];

    const { body, statusCode } = await useCase.execute(user.id + '1');

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
  });

  it('should return a 500 error if repository not provided', async () => {
    const useCase = new DeleteUserUsecase(undefined as unknown as IUserRepository);
    const user = UsersMock[0];

    const { body, statusCode } = await useCase.execute(user.id);

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('message');
  });
});
