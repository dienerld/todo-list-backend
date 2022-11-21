import { CustomError } from './customError';

class InvalidParamError extends CustomError {
  constructor (paramName: string) {
    super('InvalidParamError', `Invalid param: ${paramName}`);
  }
}

export { InvalidParamError };
