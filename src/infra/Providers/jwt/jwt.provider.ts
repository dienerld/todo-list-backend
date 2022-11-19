import jwt from 'jsonwebtoken';

import { IJwtService, TJwtPayload } from '@presentation/interfaces/IJwtService';
import { jwtConfig } from '@configs/jwt';

class JWTService implements IJwtService {
  sign (payload: any): string {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  }

  decode (token: string): TJwtPayload {
    const { iat, exp, sub, id } = jwt.decode(token) as jwt.JwtPayload;
    return { sub, iat, exp, id };
  }
}

export { JWTService };
