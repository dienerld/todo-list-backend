import request from 'supertest';
import jwt from 'jsonwebtoken';

import { appDataSource } from '@database/data-source';
import { userSchema } from '@database/schemas/user.schema';
import { app } from '@http/app';
import { User } from '@models/user';
import { jwtConfig } from '@configs/jwt';
import { RedisRepository } from '@cache/redis.repository';

describe('[Controller] Create User', () => {
  // jest.mock('ioredis', () => require('ioredis-mock'));

  let user: User;
  jest.setTimeout(10000);
  const generateToken = (_user: User) => {
    const token = jwt.sign({
      id: _user.id,
      email: _user.email,
      name: _user.name
    }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn }
    );

    return token;
  };

  beforeAll(async () => {
    await appDataSource.initialize();
    await appDataSource.runMigrations();
  });

  afterAll(async () => {
    await appDataSource.destroy();
    RedisRepository.client.disconnect();
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

  it('Should be able delete user', async () => {
    const response = await request(app).delete('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(204);
    expect(response.body).toMatchObject({});
  });
});
