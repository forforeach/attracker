const mongoose = require('mongoose');
const isEmail = require('validator').isEmail;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    required: 'Username is required'
  },
  email: {
    type: String,
    unique: true,
    required: 'Email is required for user',
    validate: {
      validator: isEmail,
      msg: 'Email has incorrect format'
    }
  }
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = User;
