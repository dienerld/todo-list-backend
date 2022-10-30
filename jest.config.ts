export default {
  transform: {
    '^.+\\.ts?$': '@swc/jest'
  },
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/src/**/*.ts'],
  testMatch: ['**/*.{test,spec}.ts'],
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@models/(.*)': '<rootDir>/src/core/models/$1',
    '@presentation/(.*)': '<rootDir>/src/core/presentation/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@database/(.*)': '<rootDir>/src/database/$1'
  }
};
