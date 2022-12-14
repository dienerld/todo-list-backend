import request from 'supertest';

import { appDataSource } from '@database/data-source';
import { userSchema } from '@database/schemas/user.schema';
import { UserRequestDto } from '@models/user';
import { app } from '@http/app';

describe('[Controller] Create User', () => {
  beforeEach(async () => {
    await appDataSource.manager.clear(userSchema);
  });

  it('Should be able a create a new user', async () => {
    const dataRequest: UserRequestDto = {
      name: 'any name',
      email: 'any_mail@mail.com',
      password: 'val1d_password',
      password_confirm: 'val1d_password'
    };

    const response = await request(app).post('/users')
      .set('Accept', 'application/json')
      .send(dataRequest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', dataRequest.name);
    expect(response.body).toHaveProperty('email', dataRequest.email);
    expect(response.body).toHaveProperty('created_at');
  });

  it('Should not be able a create a new user with invalid name', async () => {
    const dataRequest: UserRequestDto = {
      name: 'invalid_name',
      email: 'any_mail@mail.com',
      password: 'any_password1',
      password_confirm: 'any_password1'
    };

    const response = await request(app).post('/users')
      .set('Accept', 'application/json')
      .send(dataRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid param: Name');
  });

  it('Should not be able a create a new user with invalid email', async () => {
    const dataRequest: UserRequestDto = {
      name: 'valid name',
      email: 'invalid_mail@mail',
      password: 'any_password1',
      password_confirm: 'any_password1'
    };

    const response = await request(app).post('/users')
      .set('Accept', 'application/json')
      .send(dataRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid param: Email');
  });

  it('Should not be able a create a new user with invalid password', async () => {
    const dataRequest: UserRequestDto = {
      name: 'valid name',
      email: 'any_mail@mail.com',
      password: 'invalid_password',
      password_confirm: 'invalid_password'
    };

    const response = await request(app).post('/users')
      .set('Accept', 'application/json')
      .send(dataRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid param: Password');
  });

  it('Should not be able a create a new user with invalid password confirmation', async () => {
    const dataRequest: UserRequestDto = {
      name: 'valid name',
      email: 'any_mail@mail.com',
      password: 'valid_password1',
      password_confirm: 'invalid_password'
    };

    const response = await request(app).post('/users')
      .set('Accept', 'application/json')
      .send(dataRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid param: Password does not match');
  });

  it('Should not be able a create a new user with email already in use', async () => {
    const dataRequest: UserRequestDto = {
      name: 'valid name',
      email: 'any_mail@mail.com',
      password: 'any_password1',
      password_confirm: 'any_password1'
    };

    await request(app).post('/users')
      .set('Accept', 'application/json')
      .send(dataRequest);

    const response = await request(app).post('/users')
      .set('Accept', 'application/json')
      .send(dataRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User already exists');
  });

  it('Should returns 500 status code when internal server error', async () => {
    jest.spyOn(appDataSource.manager, 'save').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });

    const dataRequest: UserRequestDto = {
      name: 'valid name',
      email: 'any_mail@mail.com',
      password: 'any_password1',
      password_confirm: 'any_password1'
    };

    const response = await request(app).post('/users')
      .set('Accept', 'application/json')
      .send(dataRequest);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Internal server error');
  });
});
