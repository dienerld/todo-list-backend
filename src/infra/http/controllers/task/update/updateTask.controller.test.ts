import request from 'supertest';
import jwt from 'jsonwebtoken';

import { jwtConfig } from '@configs/jwt';
import { appDataSource } from '@database/data-source';
import { taskSchema } from '@database/schemas/task.schema';
import { userSchema } from '@database/schemas/user.schema';
import { User } from '@models/user';
import { app } from '@http/app';
import { Task } from '@models/task';

describe('[Controller] Update Task', () => {
  let user: User;
  let task: Task;
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

  it('Should return 204 when send one property', async () => {
    const response = await request(app).put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({
        title: 'new title'
      });

    const taskDatabase = await appDataSource.manager.findOneBy(taskSchema, { id: task.id });

    expect(response.status).toBe(204);
    expect(taskDatabase).toHaveProperty('title', 'new title');
  });

  it('Should returns 204 send request without body', async () => {
    const response = await request(app).put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send();

    const taskDatabase = await appDataSource.manager.findOneBy(taskSchema, { id: task.id });

    expect(response.status).toBe(204);
    expect(task).toStrictEqual(taskDatabase);
  });

  it('Should returns 204 send request with all properties', async () => {
    const date = new Date();
    const response = await request(app).put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({
        title: 'new title',
        date,
        hour: '00:00',
        done: true,
        hidden: true
      });

    const taskDatabase = await appDataSource.manager.findOneBy(taskSchema, { id: task.id });

    expect(response.status).toBe(204);
    expect(taskDatabase).toHaveProperty('title', 'new title');
    expect(taskDatabase).toHaveProperty('date', date);
    expect(taskDatabase).toHaveProperty('hour', '00:00');
    expect(taskDatabase).toHaveProperty('done', true);
    expect(taskDatabase).toHaveProperty('hidden', true);
  });

  it('Should returns 401 if not send token', async () => {
    const response = await request(app).put(`/tasks/${task.id}`)
      .send();

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'UnauthorizedError');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });

  it('Should returns 400 if invalid id', async () => {
    const response = await request(app).put('/tasks/invalid_id')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'NotFoundError');
    expect(response.body).toHaveProperty('message', 'Task not found');
  });

  it('Should returns 400 if invalid title', async () => {
    const response = await request(app).put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({
        title: ''
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'InvalidParamError');
    expect(response.body).toHaveProperty('message', 'Invalid param: Title');
  });

  it('Should returns 400 if invalid hour', async () => {
    const response = await request(app).put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({
        hour: ''
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'InvalidParamError');
    expect(response.body).toHaveProperty('message', 'Invalid param: Hour');
  });

  it('Should returns 400 if invalid done', async () => {
    const response = await request(app).put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({
        done: ''
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'InvalidParamError');
    expect(response.body).toHaveProperty('message', 'Invalid param: Done');
  });

  it('Should returns 400 if invalid hidden', async () => {
    const response = await request(app).put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({
        hidden: ''
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'InvalidParamError');
    expect(response.body).toHaveProperty('message', 'Invalid param: Hidden');
  });
});
