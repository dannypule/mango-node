module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist/'],
};
