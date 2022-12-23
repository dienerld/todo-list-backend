/* eslint-disable n/no-path-concat */
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { userSchema } from './schemas/user.schema';
import { taskSchema } from './schemas/task.schema';

const { NODE_ENV } = process.env;

const cfgDev: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  entities: [userSchema, taskSchema],
  migrations: [__dirname + '/migrations/*.ts']
};

const cfgTest: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  logging: false,
  entities: [userSchema, taskSchema],
  migrations: [__dirname + '/migrations/*.ts']
};

const cfgProd: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  entities: [userSchema, taskSchema],
  migrations: [__dirname + '/migrations/*.js']
};

function setCfg () {
  switch (NODE_ENV) {
    case 'test':
      return cfgTest;
    case 'dev':
      return cfgDev;
    case 'prod':
      return cfgProd;
    default:
      return cfgDev;
  }
}

const appDataSource = new DataSource(setCfg());

export { appDataSource };
