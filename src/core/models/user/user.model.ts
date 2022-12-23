import { Task } from '@models/task/task.model';
import { InvalidParamError } from '@presentation/errors';
import { regexEmail, regexName } from '@presentation/helpers/validations';
import { randomUUID } from 'crypto';

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks!: Task[];
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
    if (!name.match(regexName)) { throw new InvalidParamError('Name') }
    if (!email.match(regexEmail)) { throw new InvalidParamError('Email') }
    if (!password) { throw new InvalidParamError('Password') }

    return new User(name, email, password);
  }
}

export { User };
