module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist/'],
  setupFiles: ['<rootDir>/config/tests/jest.integration-tests.setup.js'],
};
