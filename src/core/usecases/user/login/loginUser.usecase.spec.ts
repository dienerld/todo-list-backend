import { IUserRepository } from '@models/user/userRepository.interface';
import { IJwtService } from '@presentation/interfaces';
import { JwtServiceMock } from '../../../__tests__/jwtServiceMock';
import { UserRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { LoginUserUsecase } from './loginUser.usecase';

describe('[Use Case] Login User', () => {
  let userRepository: IUserRepository;
  let useCase: LoginUserUsecase;
  let jwtService: IJwtService;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    jwtService = new JwtServiceMock();
    useCase = new LoginUserUsecase(userRepository, jwtService);
  });

  it('should return a token when the user is found', async () => {
    const [user] = UsersMock;
    const result = await useCase.execute(user.id, user.password);

    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty('token');
  });

  it('should return an error when the user is not found', async () => {
    const result = await useCase.execute('invalidId', 'invalidPassword');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error', 'NotFoundError');
    expect(result.body).toHaveProperty('message', 'User not found');
  });

  it('should return an error when the password is invalid', async () => {
    const [user] = UsersMock;
    const result = await useCase.execute(user.id, 'invalidPassword');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error', 'PasswordError');
    expect(result.body).toHaveProperty('message', 'User or password incorrect');
  });

  it('should return an error when the user id is not provided', async () => {
    const result = await useCase.execute('', 'invalidPassword');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error', 'EmailError');
    expect(result.body).toHaveProperty('message', 'User or password incorrect');
  });

  it('should return an error when the password is not provided', async () => {
    const [user] = UsersMock;
    const result = await useCase.execute(user.id, '');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error', 'PasswordError');
    expect(result.body).toHaveProperty('message', 'User or password incorrect');
  });

  it('should return an error when the user id is invalid', async () => {
    const result = await useCase.execute('invalidId', 'invalidPassword');

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty('error');
  });
});
