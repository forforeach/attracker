const mongoose = require('mongoose');
const Counter = require('./Counter');
const isEmail = require('validator').isEmail;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  id: {
    type: Number,
    required: 'ID is required for user',
    unique: true,
  },
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    required: 'Username is required for user',
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: 'Email is required for user',
    validate: {
      validator: (value) => isEmail(value),
      msg: 'User email has incorrect format'
    },
  }
}, { timestamps: true });

UserSchema.pre('validate', function (next) {
  const user = this;
  if (user.isNew) {
    Counter.findByIdAndUpdate({ _id: 'userId' }, { $inc: { seq: 1 } })
      .then((counter) => counter ? counter : Counter.create({ _id: 'userId', seq: 1}))
      .then((counter) => {
        user.id = counter.seq;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
