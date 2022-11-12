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
      return res.status(401).json(HttpResponse.unauthorizedError());
    }
    const decoded = jwt.verify(token, jwtConfig.secret);

    req.user = decoded as { id: string };

    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json(HttpResponse.unauthorizedError());
    }
    return res.status(500).json(HttpResponse.serverError(err));
  }
}

export { hasAuthentication };
