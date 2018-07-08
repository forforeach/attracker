const User = require('./../models/User');

/**
 * retrieves a single user using User model
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {User}
 */
function get (req, res, next) {
  const { username } = req.params;
  const query = { userName: username };
  User.findOne(query)
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
function list (req, res, next) {
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
function create (req, res, next) {
  const userProps = req.body;
  User.create(userProps)
    .then((user) => res.json(user))
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
function update (req, res, next) {
  const { username } = req.params;
  const query = { userName: username };
  const userProps = req.body;
  User.findOneAndUpdate(query, userProps)
    .then(() => User.findOne(query))
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
function remove (req, res, next) {
  const { username } = req.params;
  const query = { userName: username };
  let userModel;
  User.findOne(query)
    .then((user) => {
      userModel = user;
      return User.findOneAndRemove(query);
    })
    .then(() => res.status(204).json(userModel))
    .catch(next);
}

module.exports = { get, create, list, update, remove };
