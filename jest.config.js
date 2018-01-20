module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js',
  },
  // testMatch: ['**/test/**/*.test.(ts|js)'],
  testMatch: ['**/__tests__/**/*.(ts|js)', '**/?(*.)(spec|test).(ts|js)'],
  testEnvironment: 'node',
};
