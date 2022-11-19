
import { IUserRepository } from '@models/user/userRepository.interface';
import { UserRepositoryMock } from '../../../__tests__/repositories/databaseMock';
import { CreateUserUseCase } from './createUser.usecase';

describe('[Use Case] Create User', () => {
  let repository: IUserRepository;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  });

  it('should create user with correct params', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);
    const { body, statusCode } = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      password_confirm: 'any_password'
    });

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name', 'any_name');
  });

  it('should return badRequest if name is not provided', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);
    const { statusCode, body } = await createUserUseCase.execute({
      name: '',
      email: 'any_mail@mail.com',
      password: 'any_password',
      password_confirm: 'any_password'
    });
    console.log(body);

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'MissingParamError');
    expect(body).toHaveProperty('message', 'Missing param: Name');
  });

  it('should return badRequest if email is not provided', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);
    const { statusCode, body } = await createUserUseCase.execute({
      name: 'any_name',
      email: '',
      password: 'any_password',
      password_confirm: 'any_password'
    });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'MissingParamError');
    expect(body).toHaveProperty('message', 'Missing param: Email');
  });

  it('should return badRequest if password is not provided', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);
    const { statusCode, body } = await createUserUseCase.execute({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: '',
      password_confirm: ''
    });
    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'MissingParamError');
    expect(body).toHaveProperty('message', 'Missing param: Password');
  });
});
