import { app } from '@http/app';
import { UserRequestDto } from '@models/user';
import request from 'supertest';

describe('[Controller] Create User', () => {
  const makeSut = () => {
    const user: UserRequestDto = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      password_confirm: 'any_password'
    };

    return {
      user
    };
  };

  it('[POST] should be return 201 if correct values', async () => {
    const { body } = await request(app)
      .post('/api/v1/users')
      .send({});

    expect(body).toHaveProperty('id');
  });
});
