const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const morgan = require('morgan');
const appConfig = require('./../configs/app.config');
const clientErrorHandler = require('./middlewares/client-error-handler');
const logErrorHanlder = require('./middlewares/log-error-handler');

const apiRouter = require('./routes');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(
  jwt({ secret: appConfig.auth.secret })
    .unless({ path: ['/api/users/authenticate', '/api/users/register'] })
);

app.use('/api', apiRouter);

app.use(logErrorHanlder);
app.use(clientErrorHandler);

module.exports = app;
