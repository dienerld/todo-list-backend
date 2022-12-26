import { appDataSource } from '../../src/infra/database/data-source';

beforeAll(async () => {
  await appDataSource.initialize();
  await appDataSource.runMigrations();
});

afterAll(async () => {
  await appDataSource.destroy();
});
