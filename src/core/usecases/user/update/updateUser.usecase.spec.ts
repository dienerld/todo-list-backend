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

  it('should return a 404 status code if user is not found', async () => {
    const useCase = new UpdateUserUseCase(userRepository);

    const { statusCode, body } = await useCase.execute('invalid id', { name: 'updated name' });
    expect(statusCode).toEqual(400);
    expect(body).toHaveProperty('error', 'NotFoundError');
  });

  it('should return a 400 status code if user is not valid', async () => {
    const useCase = new UpdateUserUseCase(userRepository);
    const user = UsersMock[0];

    const { statusCode, body } = await useCase.execute(user.id, { name: '' });
    expect(statusCode).toEqual(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
  });
});
