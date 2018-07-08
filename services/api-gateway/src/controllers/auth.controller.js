const AuthUser = require('./../models/authUser');
const auth = require('../auth/utils');

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
    AuthUser.create(userProps)
      .then((user) => auth.removePasswordProp(user.toObject()))
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  }
}

module.exports = { register };
