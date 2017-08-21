const jwt = require('jsonwebtoken');
const appConfig = require('./../../configs/app.config');
const User = require('./../models/user');

/**
 * creates a user using User model
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {User}
 */
function register(req, res, next) {
  const userProps = req.body;
  if (!userProps.password) {
    res.status(400).send();
  } else {
    User.create(userProps)
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  }
}

/**
 * retrieves a single user using User model
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {User}
 */
function get(req, res, next) {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
}

/**
 * retrieves all users using User model
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {User[]}
 */
function list(req, res, next) {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch(next);
}

/**
 * edits a user using User model
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {User}
 */
function update(req, res, next) {
  const { id } = req.params;
  const userProps = req.body;
  User.findByIdAndUpdate(id, userProps)
    .then(() => User.findById(id))
    .then((user) => {
      res.json(user);
    })
    .catch(next);
}

/**
 * removes a user using User model
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {User}
 */
function remove(req, res, next) {
  const { id } = req.params;
  let userModel;
  User.findById(id)
    .then((user) => {
      userModel = user;
      return User.findByIdAndRemove(id);
    })
    .then(() => res.status(204).json(userModel))
    .catch(next);
}

/**
 * removes a user using User model
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {Token}
 */
function authenticate(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email }, {
    userName: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    password: 1
  })
    .then((user) => {
      if (user === null) {
        res.status(404).json({ message: 'User not found' });
      } else {
        user.compare(password)
          .then((equal) => {
            if (!equal) {
              res.status(401).json({ message: 'Wrong credentials' });
            } else {
              const userObject = user.toObject();
              delete userObject.password;
              jwt.sign(userObject, appConfig.auth.secret, {
                expiresIn: 60 * 15
              }, (err, token) => {
                if (err) {
                  next(err);
                } else {
                  res.json({ token });
                }
              });
            }
          })
          .catch(next);
      }
    })
    .catch(next);
}


module.exports = { register, get, list, update, remove, authenticate };
