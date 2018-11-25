module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  testRegex: '\\.ispec\\.js$',
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist/'],
};
