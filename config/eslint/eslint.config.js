'use strict';

module.exports = {
  extends: ['eslint:recommended', 'angular'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'angular/no-service-method': 'off',
    'angular/log': 'warn',
    'no-console': 'warn',
  },
};