module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.js'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/']
};