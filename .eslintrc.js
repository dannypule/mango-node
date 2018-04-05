module.exports = {
  root: true,
  parser: "babel-eslint",
  extends: "strongloop",
  globals: {
    process: true
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"],
        paths: ["."]
      }
    }
  },
  env: {
    es6: true,
    jest: true
  },
  rules: {
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "object-curly-newline": 0,
    "arrow-body-style": 0,
    "class-methods-use-this": 0,
    "comma-dangle": [2, "never"],
    "consistent-return": 0,
    "func-names": 2,
    "global-require": 0,
    "linebreak-style": [2, "unix"],
    "max-len": 0,
    "no-confusing-arrow": 0,
    "no-console": 0,
    "no-debugger": 0,
    "no-mixed-operators": 0,
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-shadow": 0,
    "no-underscore-dangle": 0,
    quotes: [2, "single", { avoidEscape: true, allowTemplateLiterals: true }],
    semi: [2, "never"],
    "import/first": 0,
    "import/prefer-default-export": 0,
    "import/newline-after-import": 0,
    "function-paren-newline": 0,
    "arrow-parens": 0,
    "space-before-function-paren": 0
  }
};
