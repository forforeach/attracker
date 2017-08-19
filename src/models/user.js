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
  password: {
    type: String,
    required: 'Password is required'
  },
  email: {
    type: String,
    unique: true,
    required: 'Email is required for user',
    validate: {
      validator: (value) => isEmail(value),
      msg: 'Email has incorrect format'
    }
  }
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = User;
