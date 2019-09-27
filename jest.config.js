module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: '__tests__/coverage',
  coveragePathIgnorePatterns: ['src/server.js', 'src/configs/*'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
};
