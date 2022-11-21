import { CustomError } from './customError';

class MissingParamError extends CustomError {
  constructor (paramName: string) {
    super('MissingParamError', `Missing param: ${paramName}`);
  }
}

export { MissingParamError };
