const app = require('./src/app');
const db = require('./src/db');
const appConfig = require('./configs/app.config');

db
  .then((msg) => {
    console.log(msg);
    app.listen(appConfig.port, () => {
      console.log('App listenning on port', appConfig.port);
    });
  })
  .catch((error) => console.log(msg));

