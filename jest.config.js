module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/test/**/*.spec.ts'],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  cacheDirectory: '<rootDir>/.cache/jest',
  coverageReporters: ['json', 'lcov', 'html', 'text'],
  coverageDirectory: '<rootDir>/build/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/test/'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 70,
      statements: 70
    }
  }
};
