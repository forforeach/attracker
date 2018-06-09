const express = require('express');

const apiRouter = express.Router();

const routersInits = [
  require('./user.routes'),
  require('./auth.routes')
];

routersInits.forEach((routerInit) => routerInit(apiRouter));

module.exports = apiRouter;
