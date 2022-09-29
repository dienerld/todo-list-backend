import { NextFunction, Response } from 'express';
import { getDatabase } from '../../database';
import { CustomRequest } from '../interfaces/customRequest';

function userAlreadyExistsMiddleware (req: CustomRequest, res: Response, next: NextFunction) {
  const { email } = req.body;
  try {
    const DB = getDatabase();
    if (DB.users.find(user => user.email === email)) {
      return res.status(400).send({ message: 'User already exists' });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
}

export { userAlreadyExistsMiddleware };
