import { randomUUID } from 'crypto';
import { MissingParamError } from '../../presentation/errors/missingParams';
import { Task } from '../task/task.model';

function isParamMissing (str: string): boolean {
  return str.trim().length <= 1;
}

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks: Task[];

  constructor (name: string, email: string, password: string) {
    if (isParamMissing(name)) { throw new MissingParamError('Name'); }
    if (isParamMissing(email)) { throw new MissingParamError('Email'); }
    if (isParamMissing(password)) { throw new MissingParamError('Password'); }

    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.tasks = [];
  }

  static create (userDto: User): User {
    const user = new User(userDto.name, userDto.email, userDto.password);
    user.id = userDto.id;
    user.tasks = userDto.tasks.map(task => Task.create(task));
    return user;
  }
}

export { User };
