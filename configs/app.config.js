let appConfig;

switch (process.env.NODE_ENV) {
  case 'prod':
    appConfig = require('./app.config.prod');
    break;
  case 'dev':
    appConfig = require('./app.config.dev');
    break;
  case 'test':
    appConfig = require('./app.config.test');
    break;
  default:
    throw new Error('Environment was not specified. Exiting');
}

const commonAppConfig = {
  port: 4000
};

module.exports = Object.assign({}, appConfig, commonAppConfig);
