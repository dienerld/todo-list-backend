import { TTask } from '@models/task/task.dtos';
import { randomUUID } from 'crypto';
import { MissingParamError } from '@presentation/errors';
import { Task } from '../task/task.model';

function isParamMissing (str: string): boolean {
  return str.trim().length <= 1;
}

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks: TTask[];
  created_at: Date;
  updated_at: Date;

  constructor (name: string, email: string, password: string) {
    if (isParamMissing(name)) { throw new MissingParamError('Name'); }
    if (isParamMissing(email)) { throw new MissingParamError('Email'); }
    if (isParamMissing(password)) { throw new MissingParamError('Password'); }

    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.tasks = [];
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static create (userDto: User): User {
    const user = new User(userDto.name, userDto.email, userDto.password);
    user.id = userDto.id;
    user.created_at = userDto.created_at;
    user.updated_at = userDto.updated_at;
    user.tasks = userDto.tasks.map(task => Task.create(task));
    return user;
  }
}

export { User };
