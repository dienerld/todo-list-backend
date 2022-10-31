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
      body: { message: error.message }
    };
  }

  static serverError (): IHttpResponse {
    return {
      statusCode: 500,
      body: { message: new ServerError().message }
    };
  }

  static unauthorizedError (): IHttpResponse {
    return {
      statusCode: 401,
      body: { message: new UnauthorizedError().message }
    };
  }

  static ok<T> (data: T): IHttpResponse {
    return {
      statusCode: 200,
      body: data
    };
  }

  static created<T> (data: T): IHttpResponse {
    return {
      statusCode: 201,
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
