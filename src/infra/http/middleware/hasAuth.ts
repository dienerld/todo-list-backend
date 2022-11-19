import { TokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../interfaces/customRequest';
import { HttpResponse } from '@presentation/helpers';
import { JWTService } from '../../Providers/jwt/jwt.provider';

async function hasAuthentication (req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;

    const token = auth?.split(' ')[1];
    if (!token) {
      const { statusCode, body } = HttpResponse.unauthorizedError();
      return res.status(statusCode).json(body);
    }
    const decoded = new JWTService().decode(token);

    req.user = decoded;

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      const { statusCode, body } = HttpResponse.unauthorizedError();
      return res.status(statusCode).json(body);
    }
    const { statusCode, body } = HttpResponse.serverError(err);
    return res.status(statusCode).json(body);
  }
}

export { hasAuthentication };
