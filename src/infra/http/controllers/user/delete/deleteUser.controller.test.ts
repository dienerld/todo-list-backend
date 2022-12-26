import { randomUUID } from 'node:crypto';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { appDataSource } from '@database/data-source';
import { userSchema } from '@database/schemas/user.schema';
import { app } from '@http/app';
import { User } from '@models/user';
import { jwtConfig } from '@configs/jwt';

describe('[Controller] Delete User', () => {
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
  const sleep = async (sec: number) => {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
  };
  beforeAll(async () => {
    await appDataSource.initialize();
    await appDataSource.runMigrations();
  });

  afterAll(async () => {
    await appDataSource.destroy();
  });

  beforeEach(async () => {
    await appDataSource.manager.clear(userSchema);
    user = User.create(
      'any name',
      'any_mail@mail.com',
      'valid_password1'
    );

    await appDataSource.manager.save(user);
  });

  it('Should returns 204 if delete successfully', async () => {
    const response = await request(app).delete('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
  });

  it('Should returns 400 if not found user', async () => {
    const response = await request(app).delete('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken({ ...user, id: randomUUID() })}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'NotFoundError');
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('Should returns 401 if token expired', async () => {
    const token = generateToken(user, 1);
    await sleep(1);
    const response = await request(app).delete('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'UnauthorizedError');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });

  it('Should returns 401 if token is invalid', async () => {
    const response = await request(app).delete('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}invalid`);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'JsonWebTokenError');
    expect(response.body).toHaveProperty('message', 'invalid signature');
  });

  it('Should returns 401 if token is not provided', async () => {
    const response = await request(app).delete('/users')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'UnauthorizedError');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });
});
