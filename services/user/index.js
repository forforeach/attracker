const appStart = require('./src/app').start;
const dbStart = require('./src/db');


dbStart()
  .then(console.log)
  .then(() => appStart())
  .catch(console.log);

