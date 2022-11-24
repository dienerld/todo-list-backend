
import { IUserRepository } from '@models/user/userRepository.interface';
import { resetUsers, UserRepositoryMock, UsersMock } from '../../../__tests__/repositories/databaseMock';
import { CreateUserUseCase } from './createUser.usecase';

describe('[Use Case] Create User', () => {
  let repository: IUserRepository;

  beforeEach(() => {
    resetUsers();
    repository = new UserRepositoryMock();
  });

  it('should create user with correct params', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);

    const { body, statusCode } = await createUserUseCase.execute({
      name: 'Any Name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      password_confirm: 'any_password'
    });

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name', 'Any Name');
  });

  it('should return badRequest if name is not provided', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);

    const { statusCode, body } = await createUserUseCase.execute({
      name: '',
      email: 'any_mail@mail.com',
      password: 'any_password',
      password_confirm: 'any_password'
    });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'MissingParamError');
    expect(body).toHaveProperty('message', 'Missing param: Name');
  });

  it('should return badRequest if email is not provided', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);

    const { statusCode, body } = await createUserUseCase.execute({
      name: 'Any Name',
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
      name: 'Any Name',
      email: 'any_mail@mail.com',
      password: '',
      password_confirm: ''
    });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'MissingParamError');
    expect(body).toHaveProperty('message', 'Missing param: Password');
  });

  it('should return badRequest if password does not match', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);

    const { statusCode, body } = await createUserUseCase.execute({
      name: 'Any Name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      password_confirm: 'any_password2'
    });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
    expect(body).toHaveProperty('message', 'Invalid param: Password does not match');
  });

  it('should return badRequest if email is already in use', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);
    const user = UsersMock[0];

    const { body, statusCode } = await createUserUseCase.execute({
      name: 'Any Name',
      email: user.email,
      password: 'any_password',
      password_confirm: 'any_password'
    });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
    expect(body).toHaveProperty('message', 'Invalid param: Email already in use');
  });

  it('should return serverError if repository not provided', async () => {
    const createUserUseCase = new CreateUserUseCase(undefined as unknown as IUserRepository);

    const { statusCode } = await createUserUseCase.execute({
      name: 'Any Name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      password_confirm: 'any_password'
    });

    expect(statusCode).toBe(500);
  });
});
