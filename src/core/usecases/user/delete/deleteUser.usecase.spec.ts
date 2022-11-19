import { IUserRepository } from '@models/user/userRepository.interface';
import { UserRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { DeleteUserUsecase } from './deleteUser.usecase';

describe('[Use case] Delete User', () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
  });

  it('should return a 204 status code if user is deleted', async () => {
    const useCase = new DeleteUserUsecase(userRepository);
    const user = UsersMock[0];

    const { statusCode } = await useCase.execute(user.id);

    expect(statusCode).toBe(204);
  });
});
