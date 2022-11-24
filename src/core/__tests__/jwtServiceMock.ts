import { IJwtService, TJwtPayload } from '@presentation/interfaces';

class JwtServiceMock implements IJwtService {
  sign (payload: any): string {
    return '';
  }

  decode (token: string): TJwtPayload {
    return {
      exp: 0,
      iat: 0,
      sub: '',
      id: ''
    };
  }
}

export { JwtServiceMock };
