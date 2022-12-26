import jwt from 'jsonwebtoken';
import request from 'supertest';

import { jwtConfig } from '@configs/jwt';
import { appDataSource } from '@database/data-source';
import { userSchema } from '@database/schemas/user.schema';
import { User } from '@models/user';
import { app } from '@http/app';

describe('[Controller] Login User', () => {
  let user: User;
  const generateToken = (_user: User, expires?: number) => {
    const token = jwt.sign({
      id: _user.id,
      email: _user.email,
      name: _user.name
    }, jwtConfig.secret, { expiresIn: expires || jwtConfig.expiresIn }
    );

    return token;
  };

  beforeEach(async () => {
    await appDataSource.manager.clear(userSchema);
    user = User.create(
      'any name',
      'any_mail@mail.com',
      'valid_password1'
    );

    await appDataSource.manager.save(user);
  });

  it('Returns 200 when user founded', async () => {
    const body = {
      email: user.email,
      password: user.password
    };

    const response = await request(app).post('/users/login')
      .set('Accept', 'application/json')
      .send(body);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Returns 400 if user not founded ', async () => {
    const body = {
      email: 'not_found@mail.com',
      password: 'any_password1'
    };

    const response = await request(app).post('/users/login')
      .set('Accept', 'application/json')
      .send(body);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('error', 'NotFoundError');
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('Returns 400 when email not provided', async () => {
    const body = {
      email: '',
      password: user.password
    };

    const response = await request(app).post('/users/login')
      .set('Accept', 'application/json')
      .send(body);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('error', 'MissingParamError');
    expect(response.body).toHaveProperty('message', 'Missing param: Email');
  });

  it('Returns 400 when password not provided', async () => {
    const body = {
      email: user.email,
      password: ''
    };

    const response = await request(app).post('/users/login')
      .set('Accept', 'application/json')
      .send(body);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('error', 'MissingParamError');
    expect(response.body).toHaveProperty('message', 'Missing param: Password');
  });

  it('Returns 401 when password is invalid', async () => {
    const body = {
      email: user.email,
      password: 'invalid_password'
    };

    const response = await request(app).post('/users/login')
      .set('Accept', 'application/json')
      .send(body);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('error', 'PasswordError');
    expect(response.body).toHaveProperty('message', 'User or password incorrect');
  });
});
