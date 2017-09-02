'use strict';

const path = require('path');
const fs = require('fs');

/**
 * projectDirectory will equals the path from which the script is called i.e package.json directory
 * if called in a NPM script
 */
const projectDirectory = fs.realpathSync(process.cwd());
const resolvePath = (...paths) => path.resolve(projectDirectory, ...paths);

module.exports = {
  projectDirectory,
  resolvePath,
};
