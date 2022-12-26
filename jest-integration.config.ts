import config from './jest.config';
config.testMatch = ['**/*.test.ts'];
config.setupFilesAfterEnv = [
  '<rootDir>/__tests__/setup/typeorm.ts',
  '<rootDir>/__tests__/setup/ioredis.ts'
];

export default config;
