import request from 'supertest';
import jwt from 'jsonwebtoken';

import { appDataSource } from '@database/data-source';
import { taskSchema } from '@database/schemas/task.schema';
import { userSchema } from '@database/schemas/user.schema';
import { User } from '@models/user';
import { jwtConfig } from '@configs/jwt';
import { app } from '@http/app';
import { TaskRequestDto } from '@models/task';

describe('[Controller] Create Task', () => {
  let user: User;
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

  it('Returns 201 when task is created', async () => {
    const body: TaskRequestDto = {
      title: 'any title',
      date: new Date(),
      hour: '00:00'
    };
    const response = await request(app).post('/tasks')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send(body);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toMatchObject({
      ...body,
      date: body.date.toISOString()
    });
  });

  it('Returns 500 when token is invalid', async () => {
    const body: TaskRequestDto = {
      title: 'any title',
      date: new Date(),
      hour: '00:00'
    };
    const response = await request(app).post('/tasks')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}1`)
      .send(body);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toHaveProperty('error', 'JsonWebTokenError');
    expect(response.body).toHaveProperty('message', 'invalid signature');
  });

  it('Returns 400 when title is not provided', async () => {
    const body: TaskRequestDto = {
      title: '',
      date: new Date(),
      hour: '00:00'
    };
    const response = await request(app).post('/tasks')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send(body);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('error', 'MissingParamError');
    expect(response.body).toHaveProperty('message', 'Missing param: Title');
  });

  it('Returns 400 when date is not provided', async () => {
    const body: TaskRequestDto = {
      title: 'any title',
      date: null as unknown as Date,
      hour: '00:00'
    };
    const response = await request(app).post('/tasks')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send(body);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('error', 'MissingParamError');
    expect(response.body).toHaveProperty('message', 'Missing param: Date');
  });

  it('Returns 400 when hour is not provided', async () => {
    const body: TaskRequestDto = {
      title: 'any title',
      date: new Date(),
      hour: ''
    };
    const response = await request(app).post('/tasks')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send(body);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('error', 'MissingParamError');
    expect(response.body).toHaveProperty('message', 'Missing param: Hour');
  });
});
