import { ServerError } from '../errors/serverError';
import { UnauthorizedError } from '../errors/unauthorizedError';

export interface IHttpResponse{
  statusCode: number,
  body: any
}

class HttpResponse {
  static badRequest (error: Error): IHttpResponse {
    return {
      statusCode: 400,
      body: error
    };
  }

  static serverError (): IHttpResponse {
    return {
      statusCode: 500,
      body: new ServerError()
    };
  }

  static unauthorizedError (): IHttpResponse {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    };
  }

  static ok<T> (data: T): IHttpResponse {
    return {
      statusCode: 200,
      body: data
    };
  }

  static noContent (): IHttpResponse {
    return {
      statusCode: 204,
      body: undefined
    };
  }
}

export { HttpResponse };
