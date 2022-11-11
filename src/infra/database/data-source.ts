/* eslint-disable n/no-path-concat */
import { DataSource } from 'typeorm';
import 'dotenv/config';

console.log(__dirname);
export default new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  logging: true,
  entities: ['../../core/models/**/*.model.ts'],
  migrations: [__dirname + '/migrations/*.ts']
});
