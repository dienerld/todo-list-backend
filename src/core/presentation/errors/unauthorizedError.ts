import { CustomError } from './customError';

class UnauthorizedError extends CustomError {
  constructor () {
    super('UnauthorizedError', 'Unauthorized');
  }
}

export { UnauthorizedError };
