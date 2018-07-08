const AuthUser = require('./../models/AuthUser');

/**
 * retrieves a single user using User model
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {User}
 */
function get(req, res, next) {
  const { username } = req.params;
  const query = { userName: username };
  AuthUser.findOne(query)
    .then((user) => res.json(user))
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
  AuthUser.find({})
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
  const { username } = req.params;
  const query = { userName: username };
  const userProps = req.body;
  AuthUser.findOneAndUpdate(query, userProps)
    .then(() => AuthUser.findOne(query))
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
  const { username } = req.params;
  const query = { userName: username };
  let userModel;
  AuthUser.findOne(query)
    .then((user) => {
      userModel = user;
      return AuthUser.findOneAndRemove(query);
    })
    .then(() => res.status(204).json(userModel))
    .catch(next);
}

module.exports = { get, list, update, remove };
