import { CustomError } from './customError';

class NotFoundError extends CustomError {
  constructor (object: string) {
    super(`${object} not found`);
    this.name = 'NotFoundError';
  }
}

export { NotFoundError };
