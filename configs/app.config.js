let appConfig;

switch (process.env.NODE_ENV) {
  case 'prod':
    appConfig = require('./app.config.prod');
    break;
  case 'dev':
    appConfig = require('./app.config.dev');
    break;
  default:
    throw new Error('Environment was not specified. Exiting');
}

module.exports = appConfig;
