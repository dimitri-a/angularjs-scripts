'use strict';

const Joi = require('joi');
const chalk = require('chalk');

const schemas = {
  build: Joi.object().keys({
    analyze: Joi.boolean(),
    _: Joi.array(),
  }),
};

module.exports = (scriptName, args) => {
  if (!Object.keys(schemas).includes(scriptName)) {
    return args;
  }

  const { error, value } = Joi.validate(args, schemas[scriptName]);

  if (error === null) {
    return value;
  }

  console.log();
  console.log(chalk`{redBright.bold Unvalid arguments supplied: ${error}}`);
  process.exit(1);
};
