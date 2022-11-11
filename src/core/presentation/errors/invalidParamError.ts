import { CustomError } from './customError';

class InvalidParamError extends CustomError {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParamError';
  }
}

export { InvalidParamError };
