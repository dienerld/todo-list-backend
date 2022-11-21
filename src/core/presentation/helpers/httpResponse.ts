import { UnauthorizedError } from '../errors/unauthorizedError';

export interface IHttpResponse{
  statusCode: number,
  body: any
}

class HttpResponse {
  static badRequest (error: Error): IHttpResponse {
    return {
      statusCode: 400,
      body: {
        error: error.name,
        message: error.message
      }
    };
  }

  static serverError (error: any): IHttpResponse {
    return {
      statusCode: 500,
      body: { error: error.name, message: error.message }
    };
  }

  static unauthorizedError (): IHttpResponse {
    const { name, message } = new UnauthorizedError();
    return {
      statusCode: 401,
      body: {
        error: name,
        message
      }
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
