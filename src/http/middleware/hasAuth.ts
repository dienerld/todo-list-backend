import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../interfaces/customRequest';

function hasAuthentication (req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;

    const token = auth?.split(' ')[1];
    if (!token) {
      // return res.status(401).json({ error: 'Unauthorized' });
      return res.status(401).json({ error: 'Unauthorized Auth if' });
    }
    const decoded = jwt.verify(token, 'secret');

    req.user = decoded as { id: string };

    next();
  } catch (err) {
    console.log(err);

    // return res.status(401).json({ error: 'Unauthorized' });
    return res.status(401).json({ error: 'Unauthorized Auth Catch' });
  }
}

export { hasAuthentication };
