import { cacheConfig } from '@configs/cache';
import { IUserRepository } from '@models/user';
import { RedisCacheMock, UserRepositoryMock, UsersMock } from '../../../__tests__/repositories';
import { UpdateUserUseCase } from './updateUser.usecase';

describe('[Use Case] Update User', () => {
  const makeSut = () => {
    const userRepository = new UserRepositoryMock();
    const cacheRepository = new RedisCacheMock();
    const sut = new UpdateUserUseCase(userRepository, cacheRepository);

    return { userRepository, sut, cacheRepository };
  };

  it('should return a 204 status code if user is updated', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode } = await sut.execute(user.id, { name: 'Updated Name' });

    expect(statusCode).toBe(204);
  });

  it('should confirm if has user in cache', async () => {
    const { sut, cacheRepository } = makeSut();
    const user = UsersMock[0];
    const spy = jest.spyOn(cacheRepository, 'set');
    await sut.execute(user.id, { name: 'Updated Name' });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`${cacheConfig.prefix.user}-${user.id}`, user);
  });

  it('should return a 204 status code if updated email', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode } = await sut.execute(user.id, { email: 'new_mail@mail.com' });

    expect(statusCode).toBe(204);
  });

  it('should return a 204 status code if updated password', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode } = await sut.execute(user.id, { password: 'new_password1', password_confirm: 'new_password1' });

    expect(statusCode).toBe(204);
  });

  it('should return a 404 status code if user is not found', async () => {
    const { sut } = makeSut();
    const { statusCode, body } = await sut.execute('invalid id', { name: 'any name' });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'NotFoundError');
  });

  it('should return a 400 status code if user is not valid', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { name: '' });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
  });

  it('should return a 400 status code if invalid email', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { email: 'invalid email' });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
  });

  it('should return a 400 status code if invalid password', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { password: '123', password_confirm: '123' });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
  });

  it('should return a 400 status code if password does not match', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { password: 'any_password', password_confirm: 'any_password2' });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
  });

  it('should return a 400 if undefined password and has password_confirm', async () => {
    const { sut } = makeSut();
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { password_confirm: 'any_password' });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'InvalidParamError');
  });

  it('should return a 500 status code if database repository not provided', async () => {
    const { cacheRepository } = makeSut();
    const sut = new UpdateUserUseCase(null as unknown as IUserRepository, cacheRepository);
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { name: 'any name' });

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('error');
  });

  it('should return a 500 status code if database repository throws', async () => {
    const { sut, userRepository } = makeSut();
    jest.spyOn(userRepository, 'findById').mockImplementationOnce(() => { throw new Error() });
    const user = UsersMock[0];
    const { statusCode, body } = await sut.execute(user.id, { name: 'any name' });

    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('error');
  });
});
