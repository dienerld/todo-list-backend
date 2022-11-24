import { CustomError } from './customError';

class ServerError extends CustomError {
  constructor () {
    super('ServerError', 'Internal server error');
  }
}

export { ServerError };
