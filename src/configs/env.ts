import 'dotenv/config';

export const envs = {
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET
};
