const mongoose = require('mongoose');
const dbConfig = require('./../configs/app.config').db;

const promisifyDrop = (func) => new Promise((resolve) => {
  func.apply(null, () => resolve());
});

before((done) => {
  mongoose.connect(dbConfig.connectionString, {
    useMongoClient: true,
  });

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
  const collectionsPromises = collections.map((collection) => promisifyDrop(collection.drop));
  Promise.all(collectionsPromises).then(() => done());
});
