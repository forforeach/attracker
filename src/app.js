const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes');

let app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);

module.exports = app;
