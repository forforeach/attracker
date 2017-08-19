const mongoose = require('mongoose');
const isEmail = require('validator').isEmail;
const password = require('./../common/password');

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
    required: 'Password is required',
    select: false
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

UserSchema.methods.compare = function (pass) {
  return password.compare(pass, this.password);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
