import { randomUUID } from 'crypto';
import { Task } from './task.model';

class User {
  #id: string;
  #name: string;
  #email: string;
  #password: string;
  #tasks: Task[];

  constructor (name: string, email: string, password: string) {
    this.#id = randomUUID();
    this.#name = name;
    this.#email = email;
    this.#password = password;
    this.#tasks = [];
  }

  get id () {
    return this.#id;
  }

  get name () {
    return this.#name;
  }

  get email () {
    return this.#email;
  }

  get password () {
    return this.#password;
  }

  get tasks () {
    const task = this.#tasks;
    return task;
  }

  toJSON () {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      password: this.#password
    };
  }
}

export { User };
