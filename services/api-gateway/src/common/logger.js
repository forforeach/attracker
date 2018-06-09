const winston = require('winston');

const logger = new winston.Logger({
  levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, trace: 5 },
  colors: { error: 'red', warn: 'orange', info: 'yellow', verbose: 'cyan', debug: 'blue', trace: 'magenta' },
  transports: [
    new (winston.transports.Console)({
      level: 'warn',
      colorize: true,
      prettyPrint: true,
      timestamp: true
    }),
    new (winston.transports.File)({
      filename: '/usr/src/app/logs/api.log',
      level: 'info',
      prettyPrint: true,
      colorize: true,
      timestamp: true,
      maxsize: 40000,
      maxFiles: 10,
      json: false
    })
  ]
});

module.exports = logger;
