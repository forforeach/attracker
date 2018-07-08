const mongoose = require('mongoose');
const dbConfig = require('./../configs/app.config').db;


before((done) => {
  mongoose.Promise = Promise;
  mongoose.connect(dbConfig.connectionString);

  mongoose.connection
    .once('open', () => {
      console.log('Testing DB started');
      done();
    })
    .on('error', (error) => {
      console.error(error);
    });
});

beforeEach((done) => {
  const { collections } = mongoose.connection;
  collections.authusers.drop(() => collections.clients.drop(() => done()));
});

after(() => mongoose.connection.close());
