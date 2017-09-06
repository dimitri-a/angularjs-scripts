'use strict';

process.env.NODE_ENV = 'dev';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const opn = require('opn');

const webpackConfig = require('../config/webpack/webpack.config');
const { resolveAppPath } = require('../config/paths');

const compiler = webpack(webpackConfig());
const devServer = new WebpackDevServer(compiler, {
  contentBase: resolveAppPath('dist'),
  hot: true,
  stats: 'verbose',
});

devServer.listen('8080', '127.0.0.1', (err, result) => {
  if (err) {
    return console.error(err);
  }

  const url = 'http://localhost:8080';

  console.log(chalk`Starting dev server on: {blueBright.bold ${url}}`);
  console.log();

  opn(url);
});
