const app = require('./src/app');
const appConfig = require('./configs/app.config');

app.listen(appConfig.port, () => {
  console.log('app listenning on port', appConfig.port);
});
