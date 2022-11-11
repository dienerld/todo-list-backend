import 'dotenv/config';

console.log('process.env.DATABASE_URL', process.env.DB_URL);
export default {
  type: 'postgres',
  host: process.env.DB_URL,
  entities: ['../../core/models/**/*.model.ts'],
  migrations: ['./migrations/**/*.ts'],

  cli: {
    migrationsDir: 'migrations',
    entitiesDir: 'entities'
  }
};
