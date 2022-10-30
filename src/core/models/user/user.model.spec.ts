import { MissingParamError } from '../../presentation/errors/missingParams';
import { User } from './user.model';

describe('[Model] User', () => {
  it('should create a new user with correct params', () => {
    const user = new User('John Doe', 'mail@mail.com', 'any_password');

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name', 'John Doe');
  });

  it('should throw if no name is provided', () => {
    expect(() => new User('', 'any_mail@mail.com', 'any_password'))
      .toThrow(new MissingParamError('Name'));
  });

  it('should throw if no email is provided', () => {
    expect(() =>
      new User('John Doe', '', 'any_password')
    ).toThrow(new MissingParamError('Email'));
  });

  it('should throw if no password is provided', () => {
    expect(() =>
      new User('John Doe', 'any_mail@mail.com', '')
    ).toThrow(new MissingParamError('Password'));
  });

  it('should create user using method static create', () => {
    const user = User.create({
      id: 'any_id',
      name: 'John Doe',
      email: 'any_mail@mail.com',
      password: 'any_password',
      tasks: []
    });

    expect(user).toHaveProperty('id', 'any_id');
    expect(user).toHaveProperty('tasks', []);
  });
});
