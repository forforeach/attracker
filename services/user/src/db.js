const mongoose = require('mongoose');
const dbConfig = require('./../configs/app.config').db;

let result;


const start = () => {
  if (process.env.NODE_ENV !== 'test') {
    result = new Promise((resolve, reject) => {
      mongoose.Promise = global.Promise;

      mongoose.connect(dbConfig.connectionString);

      mongoose.connection
        .once('open', () => resolve('DB started'))
        .on('error', (error) => reject(error));
    });
  } else {
    result = Promise.resolve('Not started, testing environment');
  }
  return result;
};

module.exports = start;
