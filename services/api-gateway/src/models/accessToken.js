const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccessTokenSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  expirationDate: Date,
  clientId: {
    type: String,
    required: true
  },
  scope: String,
  tokenId: {
    type: String,
    unique: true,
    required: true
  },
}, { timestamps: true });

const AccessToken = mongoose.model('accesstoken', AccessTokenSchema);

module.exports = AccessToken;
