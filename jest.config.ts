export default {
  transform: { '^.+\\.ts?$': '@swc/jest' },
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/core/**/*.ts', '<rootDir>/src/infra/http/controllers/**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/core/__tests__',
    '<rootDir>/src/core/presentation'
  ],
  testMatch: ['**/*.{test,spec}.ts'],
  moduleNameMapper: {
    '@database/(.*)': '<rootDir>/src/infra/database/$1',
    '@http/(.*)': '<rootDir>/src/infra/http/$1',
    '@cache/(.*)': '<rootDir>/src/infra/cache/$1',
    '@models/(.*)': '<rootDir>/src/core/models/$1',
    '@usecases/(.*)': '<rootDir>/src/core/usecases/$1',
    '@presentation/(.*)': '<rootDir>/src/core/presentation/$1',
    '@configs/(.*)': '<rootDir>/src/configs/$1'
  },
  setupFilesAfterEnv: ['']
};
