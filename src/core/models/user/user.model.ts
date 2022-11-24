import { Task } from '@models/task/task.model';
import { InvalidParamError, MissingParamError } from '@presentation/errors';
import { regexEmail, regexName } from '@presentation/helpers';
import { randomUUID } from 'crypto';

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks!: Task[];
  verified: boolean;
  created_at: Date;
  updated_at: Date;

  private constructor (name: string, email: string, password: string) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.verified = false;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static create (name: string, email: string, password: string) {
    if (!name) { throw new MissingParamError('Name') }
    if (!email) { throw new MissingParamError('Email') }
    if (!password) { throw new MissingParamError('Password') }
    if (!name.match(regexName)) { throw new InvalidParamError('Name') }
    if (!email.match(regexEmail)) { throw new InvalidParamError('Email') }

    return new User(name, email, password);
  }
}

export { User };
