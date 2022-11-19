type TJwtPayload = {
  sub: string,
  iat: number,
  exp: number,
  id: string
}
interface IJwtService{
  sign(payload: any): string;
  decode(token: string): TJwtPayload;
}

export { TJwtPayload, IJwtService };
