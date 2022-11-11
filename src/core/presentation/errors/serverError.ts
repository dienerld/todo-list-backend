import { CustomError } from './customError';

class ServerError extends CustomError {
  constructor () {
    super('Internal server error');
    this.name = 'ServerError';
  }
}

export { ServerError };
