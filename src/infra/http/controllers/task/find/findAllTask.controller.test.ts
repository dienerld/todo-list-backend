
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { appDataSource } from '@database/data-source';
import { taskSchema } from '@database/schemas/task.schema';
import { userSchema } from '@database/schemas/user.schema';
import { User } from '@models/user';
import { jwtConfig } from '@configs/jwt';
import { app } from '@http/app';
import { Task } from '@models/task';

describe('[Controller] Find Task', () => {
  let user: User;
  let task: Task;
  const sleep = async (sec: number) => new Promise(resolve => setTimeout(resolve, sec * 1000));

  beforeAll(async () => {
    await appDataSource.manager.clear(userSchema);
    await appDataSource.manager.clear(taskSchema);

    user = User.create(
      'any name',
      'any_mail@mail.com',
      'valid_password1'
    );

    await appDataSource.manager.save(user);
  });

  beforeEach(async () => {
    await appDataSource.manager.clear(taskSchema);

    task = Task.create(
      'any title',
      new Date(),
      '00:00',
      user.id
    );

    await appDataSource.manager.save(task);
  });

  const generateToken = (_user: User, expires?: number) => {
    return jwt.sign(
      {
        id: _user.id,
        email: _user.email,
        name: _user.name
      }, jwtConfig.secret,
      { expiresIn: expires || jwtConfig.expiresIn }
    );
  };

  it('Should return 200 with task when founded', async () => {
    const response = await request(app).get('/tasks')
      .set('Authorization', `Bearer ${generateToken(user)}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('total', 1);
  });

  it('Should returns 401 if token expired', async () => {
    const token = generateToken(user, 1);
    await sleep(1);
    const response = await request(app).get('/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty('error', 'UnauthorizedError');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });

  it('Returns 500 if token is invalid', async () => {
    const response = await request(app).get('/tasks')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}1)}`);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toHaveProperty('error', 'JsonWebTokenError');
    expect(response.body).toHaveProperty('message', 'invalid token');
  });

  it('Returns 401 if token is not provided', async () => {
    const response = await request(app).get('/tasks')
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty('error', 'UnauthorizedError');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });
});
