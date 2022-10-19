import { randomUUID } from 'crypto';
import { Task } from '../task/task.model';

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

  static create (userDto: User): User {
    const user = new User(userDto.name, userDto.email, userDto.password);
    user.#id = userDto.id;
    user.#tasks = userDto.tasks.map(task => Task.create(task));
    return user;
  }

  get id () {
    return this.#id;
  }

  set name (name: string) {
    this.#name = name;
  }

  get name () {
    return this.#name;
  }

  set email (email: string) {
    this.#email = email;
  }

  get email () {
    return this.#email;
  }

  set password (password: string) {
    this.#password = password;
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
      password: this.#password,
      tasks: this.#tasks
    };
  }
}

export { User };
