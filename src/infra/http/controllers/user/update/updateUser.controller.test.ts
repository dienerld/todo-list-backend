import jwt from 'jsonwebtoken';
import request from 'supertest';

import { jwtConfig } from '@configs/jwt';
import { appDataSource } from '@database/data-source';
import { userSchema } from '@database/schemas/user.schema';
import { User } from '@models/user';
import { app } from '@http/app';

describe('[Controller] Update User', () => {
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

  it('Returns 204 if not prop for update ', async () => {
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send();

    expect(response.statusCode).toBe(204);
    const userUpdated = await appDataSource.manager.findOneBy(userSchema, { id: user.id });
    expect(userUpdated).toStrictEqual(user);
  });

  it('Returns 204 if update name', async () => {
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({ name: 'any name updated' });
    const userUpdated = await appDataSource.manager.findOneBy(userSchema, { id: user.id });

    expect(response.statusCode).toBe(204);
    expect(userUpdated?.name).toBe('any name updated');
    expect(userUpdated?.updated_at).not.toStrictEqual(user.updated_at);
  });

  it('Returns 204 if update email', async () => {
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({ email: 'updated@mail.com' });
    const userUpdated = await appDataSource.manager.findOneBy(userSchema, { id: user.id });

    expect(response.statusCode).toBe(204);
    expect(userUpdated?.email).toBe('updated@mail.com');
    expect(userUpdated?.updated_at).not.toStrictEqual(user.updated_at);
  });

  it('Returns 204 if update password', async () => {
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({ password: 'new!Password1', password_confirm: 'new!Password1' });
    const userUpdated = await appDataSource.manager.findOneBy(userSchema, { id: user.id });

    expect(response.statusCode).toBe(204);
    expect(userUpdated?.password).toBe('new!Password1');
    expect(userUpdated?.updated_at).not.toStrictEqual(user.updated_at);
  });

  it('Returns 400 if invalid name to update', async () => {
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({ name: 'invalid_value' });
    const userUpdated = await appDataSource.manager.findOneBy(userSchema, { id: user.id });

    expect(response.statusCode).toBe(400);
    expect(userUpdated).toStrictEqual(user);
  });

  it('Returns 400 if invalid email to update', async () => {
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({ email: 'invalid_value@mail' });
    const userUpdated = await appDataSource.manager.findOneBy(userSchema, { id: user.id });

    expect(response.statusCode).toBe(400);
    expect(userUpdated).toStrictEqual(user);
  });

  it('Returns 400 if invalid password to update', async () => {
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({ password: 'invalidpassword', password_confirm: 'invalidpassword' });
    const userUpdated = await appDataSource.manager.findOneBy(userSchema, { id: user.id });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'InvalidParamError');
    expect(response.body).toHaveProperty('message', 'Invalid param: Password must have at least 5 characters and special characters');
    expect(userUpdated).toStrictEqual(user);
  });

  it('Returns 400 if invalid password confirm to update', async () => {
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user)}`)
      .send({ password: 'valid_password1', password_confirm: 'invalidpassword' });
    const userUpdated = await appDataSource.manager.findOneBy(userSchema, { id: user.id });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'InvalidParamError');
    expect(response.body).toHaveProperty('message', 'Invalid param: Password does not match');
    expect(userUpdated).toStrictEqual(user);
  });

  it('Returns 401 if token expired', async () => {
    const token = generateToken(user, 1);
    await sleep(1);
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'any name updated' });
    const userUpdated = await appDataSource.manager.findOneBy(userSchema, { id: user.id });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error', 'UnauthorizedError');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
    expect(userUpdated).toStrictEqual(user);
  });

  it('Returns 401 if token invalid', async () => {
    const response = await request(app).put('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${generateToken(user) + 1}`);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'JsonWebTokenError');
    expect(response.body).toHaveProperty('message', 'invalid signature');
  });
});
