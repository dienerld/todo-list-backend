import { randomUUID } from 'crypto';

class User {
  #id: string;
  #name: string;
  #email: string;
  #password: string;

  constructor (name: string, email: string, password: string) {
    this.#id = randomUUID();
    this.#name = name;
    this.#email = email;
    this.#password = password;
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
}

export { User };
