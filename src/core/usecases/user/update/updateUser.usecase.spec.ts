import { UserRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { UpdateUserUseCase } from './updateUser.usecase';
import { IUserRepository } from '@models/user/userRepository.interface';

describe('[Use Case] Update User', () => {
  let userRepository: IUserRepository;

  beforeAll(() => { userRepository = new UserRepositoryMock() });

  it('should return a 204 status code if user is updated', async () => {
    const useCase = new UpdateUserUseCase(userRepository);
    const user = UsersMock[0];

    const { statusCode } = await useCase.execute(user.id, { name: 'updated name' });
    expect(statusCode).toEqual(204);
  });
});
