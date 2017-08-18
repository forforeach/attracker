const app = require('./src/app');
const initializeDb = require('./src/db');
const appConfig = require('./configs/app.config');

initializeDb
  .then((msg) => {
    console.log(msg);
    app.listen(appConfig.port, () => {
      console.log('App listenning on port', appConfig.port);
    });
  })
  .catch((error) => console.log(error));

