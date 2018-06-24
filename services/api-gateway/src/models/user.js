const mongoose = require('mongoose');
const isEmail = require('validator').isEmail;
const password = require('./../common/password');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    required: 'Username is required',
    unique: true,
  },
  password: {
    type: String,
    required: 'Password is required',
    select: false,
  },
  email: {
    type: String,
    unique: true,
    required: 'Email is required for user',
    validate: {
      validator: (value) => isEmail(value),
      msg: 'Email has incorrect format'
    },
  }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  password.hash(user.password)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => next(err));
});

UserSchema.methods.validatePassword = function (pass) {
  return password.compare(pass, this.password)
    .then((valid) => {
      if (!valid) {
        throw new Error('Invalid password');
      }
      return this;
    });
};

UserSchema.methods.toClientObject = function () {
  const user = this.toObject();
  user.id = user._id.toString();
  delete user._id;
  return user;
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
