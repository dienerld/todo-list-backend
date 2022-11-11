import { CustomError } from './customError';

class UnauthorizedError extends CustomError {
  constructor () {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

export { UnauthorizedError };
