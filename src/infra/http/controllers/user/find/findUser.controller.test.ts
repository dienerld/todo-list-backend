import jwt from 'jsonwebtoken';
import request from 'supertest';

import { jwtConfig } from '@configs/jwt';
import { appDataSource } from '@database/data-source';
import { userSchema } from '@database/schemas/user.schema';
import { User } from '@models/user';
import { app } from '@http/app';

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
    const response = await request(app).get('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({
      ...user,
      created_at: user.created_at.toISOString(),
      updated_at: user.updated_at.toISOString()
    });
  });

  it('Returns 401 when token is invalid', async () => {
    const response = await request(app).get('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}1`);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toHaveProperty('error', 'JsonWebTokenError');
    expect(response.body).toHaveProperty('message', 'invalid signature');
  });

  it('Should returns 401 if token expired', async () => {
    const token = generateToken(user, 1);
    await sleep(1);
    const response = await request(app).get('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'UnauthorizedError');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });

  it('Should returns 401 if token is not provided', async () => {
    const response = await request(app).get('/users')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'UnauthorizedError');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });
});
