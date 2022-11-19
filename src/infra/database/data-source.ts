/* eslint-disable n/no-path-concat */
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { userSchema } from './schemas/user.schema';
import { taskSchema } from './schemas/task.schema';

const appDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  // synchronize: true,
  entities: [userSchema, taskSchema],
  migrations: [__dirname + '/migrations/*.{ts,js}']
});

export { appDataSource };
