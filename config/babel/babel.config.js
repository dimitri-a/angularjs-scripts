'use strict';

const { browsersList } = require('../globals');

const babelConfig = {
  presets: [['env', { targets: { browsers: browsersList } }]],
  plugins: ['transform-object-rest-spread'],
};

const babelLoaderConfig = { cacheDirectory: true };

module.exports = Object.assign(babelLoaderConfig, babelConfig);
