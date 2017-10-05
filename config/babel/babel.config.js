'use strict';

const { browsersList } = require('../globals');

module.exports = {
  presets: [[require.resolve('babel-preset-env'), { targets: { browsers: browsersList } }]],
  plugins: [require.resolve('babel-plugin-transform-object-rest-spread')],
};
