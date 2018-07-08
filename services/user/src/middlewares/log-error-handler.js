const logger = require('./../common/logger');
const uuidv1 = require('uuid/v1');

module.exports = (err, req, res, next) => {
  err.traceId = uuidv1();
  logger.log('error', `\ntraceId: ${err.traceId}\n`, err);
  next(err);
};
