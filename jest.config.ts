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
    '@presentation/(.*)': '<rootDir>/src/core/presentation/$1',
    '@domain/(.*)': '<rootDir>/src/core/domain/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1'
  }
};
