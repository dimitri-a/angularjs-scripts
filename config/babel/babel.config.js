'use strict';

const babelConfig = {
  presets: ['env'],
  plugins: ['transform-object-rest-spread'],
};

const babelLoaderConfig = { cacheDirectory: true };

module.exports = Object.assign(babelLoaderConfig, babelConfig);