#!/usr/bin/env node
'use strict';

// Inspired from https://github.com/seek-oss/sku/blob/master/bin/sku.js
const chalk = require('chalk');
const spawn = require('cross-spawn');
const script = process.argv[2];
const args = process.argv.slice(3);

switch (script) {
  case 'test':
  case 'build':
  case 'start': {
    const scriptPath = require.resolve('../scripts/' + script);
    const scriptArgs = [scriptPath, ...args];

    const result = spawn.sync('node', scriptArgs, { stdio: 'inherit' });
    process.exit(result.status);
    break;
  }
  default: {
    console.log(chalk`[{redBright.bold ERROR}] Unknown script {bold ${script}}`);
    break;
  }
}
