'use strict';

process.env.NODE_ENV = 'prod';

process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');
const chalk = require('chalk');
const Promise = require('bluebird');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const webpackConfig = require('../config/webpack/webpack.config');

// inspired by: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/scripts/build.js
new Promise((resolve, reject) => {
  const compiler = webpack(webpackConfig({ prod: true }));

  compiler.run((err, stats) => {
    if (err) {
      return reject(err);
    }

    const messages = formatWebpackMessages(stats.toJson({ colors: true }));

    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      return reject(new Error(messages.errors.join('\n\n')));
    }

    return resolve({ warnings: messages.warnings });
  });
})
  .then(({ warnings }) => {
    let result = chalk`{greenBright.bold Build successful}`;

    if (warnings && warnings.length > 0) {
      result = chalk`${result} with {yellowBright.bold warnings:}\n\n${warnings.join('\n\n')}`;
    }

    console.log();
    console.log(result);
  })
  .catch(err => {
    console.log();
    console.log(chalk`{redBright.bold Build failed:}`);
    console.log(chalk`{redBright.bold ${err}}`);
    process.exit(1);
  });
