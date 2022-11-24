import { CustomError } from './customError';

class NotFoundError extends CustomError {
  constructor (object: string) {
    super('NotFoundError', `${object} not found`);
  }
}

export { NotFoundError };
