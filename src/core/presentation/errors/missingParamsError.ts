import { CustomError } from './customError';

class MissingParamError extends CustomError {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = 'MissingParamError';
  }
}

export { MissingParamError };
