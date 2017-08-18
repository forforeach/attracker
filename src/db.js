const mongoose = require('mongoose');
const dbConfig = require('./../configs/app.config').db;

mongoose.Promise = global.Promise;

let result = Promise.reject();

if (process.env.NODE_ENV !== 'test') {
  result = new Promise((resolve, reject) => {
    mongoose.connect(dbConfig.connectionString, {
      useMongoClient: true,
    });

    mongoose.connection
      .once('open', () => resolve('DB started'))
      .on('error', (error) => reject(error));
  });
} else {
  result = Promise.resolve('Not started, testing environment');
}

module.exports = result;
