const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  clientId: {
    type: String,
    unique: true,
    required: true
  },
  secret: {
    type: String,
    required: true
  }
});

ClientSchema.methods.validateSecret = function (secret) {
  return new Promise((resolve, reject) => {
    secret === this.secret ? resolve(this) : reject('Invalid client secret');
  });
};

module.exports = mongoose.model('client', ClientSchema);
