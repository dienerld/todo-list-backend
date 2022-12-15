
export default {
  transform: { '^.+\\.ts?$': '@swc/jest' },
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/core/**/*.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/src/core/__tests__'],
  testMatch: ['**/*.{test,spec}.ts'],
  moduleNameMapper: {
    '@models/(.*)': '<rootDir>/src/core/models/$1',
    '@presentation/(.*)': '<rootDir>/src/core/presentation/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@database/(.*)': '<rootDir>/src/database/$1',
    '@configs/(.*)': '<rootDir>/src/configs/$1'
  }
};
