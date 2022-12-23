import { InvalidParamError } from '@presentation/errors';
import { User } from './user.model';

describe('[Model] User', () => {
  it('should create a new user with correct params', () => {
    const user = User.create('John Doe', 'mail@mail.com', 'any_password');

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name', 'John Doe');
  });

  it('should throw if no name is provided', () => {
    expect(() => User.create('', 'any_mail@mail.com', 'any_password'))
      .toThrow(new InvalidParamError('Name'));
  });

  it('should throw if no email is provided', () => {
    expect(() =>
      User.create('John Doe', '', 'any_password')
    ).toThrow(new InvalidParamError('Email'));
  });

  it('should throw if no password is provided', () => {
    expect(() =>
      User.create('John Doe', 'any_mail@mail.com', '')
    ).toThrow(new InvalidParamError('Password'));
  });
});
