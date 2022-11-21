import { IUserRepository } from '@models/user/userRepository.interface';
import { UserRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { LoginUserUsecase } from './loginUser.usecase';

describe('[Use Case] Login User', () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
  });

  it('should return a token when the user is found', async () => {
    const useCase = new LoginUserUsecase(userRepository);
    const [user] = UsersMock;
    const result = await useCase.execute(user.id, user.password);

    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty('token');
  });
});
