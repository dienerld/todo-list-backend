import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

function hasAuthentication (req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;

    const token = auth?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, 'secret') as { id: string };

    req.body.user.id = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export { hasAuthentication };
