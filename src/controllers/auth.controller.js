const appConfig = require('./../../configs/app.config');
const User = require('./../models/user');
const createUserToken = require('./../common/auth').createUserToken;

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
        res.status(404).json({ message: 'UserNotFound' });
      } else {
        user.compare(password)
          .then((equal) => {
            if (!equal) {
              res.status(401).json({ message: 'Wrong credentials' });
            } else {
              const userObject = Object.assign({}, user.toObject(), { password: null });
              delete userObject.password;

              createUserToken(userObject, appConfig.auth.secret)
                .then((token) => res.json({ token }))
                .catch((error) => next(error));
            }
          })
          .catch(next);
      }
    })
    .catch(next);
}


module.exports = { register, authenticate };
