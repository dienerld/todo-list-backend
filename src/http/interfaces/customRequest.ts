import { Request } from 'express';
import { User } from '../../models/user/user.model';

interface CustomRequest extends Request{
    user?: User
}

export { CustomRequest };
