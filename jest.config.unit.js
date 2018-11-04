module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  testRegex: 'spec\\.js$',
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist/'],
};
