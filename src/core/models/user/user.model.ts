import { Task } from '@models/task/task.model';
import { MissingParamError } from '@presentation/errors';
import { randomUUID } from 'crypto';

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks: Task[];
  created_at: Date;
  updated_at: Date;

  constructor (name: string, email: string, password: string) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  // use to create user with validations -- previne error typeorm
  static create (name: string, email: string, password: string) {
    if (!name) { throw new MissingParamError('Name'); }
    if (!email) { throw new MissingParamError('Email'); }
    if (!password) { throw new MissingParamError('Password'); }

    return new User(name, email, password);
  }
}

export { User };
