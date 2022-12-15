import { UserRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { LoginUserUsecase } from './loginUser.usecase';

describe('[Use Case] Login User', () => {
  const makeSut = () => {
    const userRepository = new UserRepositoryMock();
    const sut = new LoginUserUsecase(userRepository);

    return { userRepository, sut };
  };

  it('should return a token when the user is found', async () => {
    const { sut } = makeSut();
    const [user] = UsersMock;
    const result = await sut.execute(user.id, user.password);

    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty('token');
  });

  it('should return an error when the user is not found', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('invalidId', 'invalidPassword');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error', 'NotFoundError');
    expect(result.body).toHaveProperty('message', 'User not found');
  });

  it('should return an error when the password is invalid', async () => {
    const { sut } = makeSut();
    const [user] = UsersMock;
    const result = await sut.execute(user.id, 'invalidPassword');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error', 'InvalidParamError');
    expect(result.body).toHaveProperty('message', 'Invalid param: Password');
  });

  it('should return an error when the user id is not provided', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('', 'invalidPassword');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error', 'InvalidParamError');
    expect(result.body).toHaveProperty('message', 'Invalid param: UserId');
  });

  it('should return an error when the password is not provided', async () => {
    const { sut } = makeSut();
    const [user] = UsersMock;
    const result = await sut.execute(user.id, '');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error', 'InvalidParamError');
    expect(result.body).toHaveProperty('message', 'Invalid param: Password');
  });

  it('should return an error when the user id is invalid', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('invalidId', 'invalidPassword');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error');
  });
});
