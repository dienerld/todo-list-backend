const jwtConfig = {
  secret: process.env.SECRET_JWT || '65b1fb37-df6a-42c3-bffb-8d7521d74413',
  expiresIn: '1d'
};

export { jwtConfig };
