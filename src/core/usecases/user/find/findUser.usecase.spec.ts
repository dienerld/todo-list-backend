import { IUserRepository } from '@models/user/userRepository.interface';
import { UserRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { FindUserUseCase } from './findUser.usecase';

describe('[Use Case] Find User', () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
  });
  it('should return a user with tasks', async () => {
    const useCase = new FindUserUseCase(userRepository);
    const user = UsersMock[0];

    const { body, statusCode } = await useCase.execute(user.id);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('id');
  });
});
