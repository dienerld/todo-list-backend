import { NextFunction, Response } from 'express';
import { getDatabase } from '../../database';
import { CustomRequest } from '../interfaces/customRequest';

function userAlreadyExistsMiddleware (req: CustomRequest, res: Response, next: NextFunction) {
  const { email } = req.body;
  try {
    const users = getDatabase();
    const userAlreadyExists = users.find(user => user.email === email);
    req.user = userAlreadyExists;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
}

export { userAlreadyExistsMiddleware };
