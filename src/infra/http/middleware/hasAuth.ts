import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../interfaces/customRequest';
import { jwtConfig } from '@configs/jwt';
import { HttpResponse } from '@presentation/helpers';

async function hasAuthentication (req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;

    const token = auth?.split(' ')[1];
    if (!token) {
      const { statusCode, body } = HttpResponse.unauthorizedError();
      return res.status(statusCode).json(body);
    }
    const decoded = jwt.verify(token, jwtConfig.secret);

    req.user = decoded as { id: string };

    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      const { statusCode, body } = HttpResponse.unauthorizedError();
      return res.status(statusCode).json(body);
    }
    const { statusCode, body } = HttpResponse.serverError(err);
    return res.status(statusCode).json(body);
  }
}

export { hasAuthentication };
