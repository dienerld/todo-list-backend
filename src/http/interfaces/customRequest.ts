import { Request } from 'express';
import { User } from '../../domain/models/user/user.model';

interface CustomRequest extends Request{
    user?: User
}

export { CustomRequest };
