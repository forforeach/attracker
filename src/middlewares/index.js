const exceptionHandler = require('./exception-handler');
const notFoundHandler = require('./not-found-handler');

module.exports = {
  post(app) {
    notFoundHandler(app);
    exceptionHandler(app);
  }
};
