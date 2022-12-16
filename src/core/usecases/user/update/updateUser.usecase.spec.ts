import { UserRepositoryMock, UsersMock } from '../../../__tests__/repositories';
import { UpdateUserUseCase } from './updateUser.usecase';

describe('[Use Case] Update User', () => {
  const makeSut = () => {
    const userRepository = new UserRepositoryMock();
    const sut = new UpdateUserUseCase(userRepository);

    return { userRepository, sut };
  };

  it('should return a 204 status code if user is updated', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode } = await sut.execute(user.id, { name: 'Updated Name' });

    expect(statusCode).toEqual(204);
  });

  it('should return a 404 status code if user is not found', async () => {
    const { sut } = makeSut();
    const { statusCode, body } = await sut.execute('invalid id', { name: 'any name' });

    expect(statusCode).toEqual(400);
    expect(body).toHaveProperty('error', 'NotFoundError');
  });

  it('should return a 400 status code if user is not valid', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { name: '' });

    expect(statusCode).toEqual(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
  });

  it('should return a 400 status code if invalid email', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { email: 'invalid email' });

    expect(statusCode).toEqual(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
  });

  it('should return a 400 status code if invalid password', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { password: '123', password_confirm: '123' });

    expect(statusCode).toEqual(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
  });
});
