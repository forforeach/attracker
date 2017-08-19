const User = require('./../models/user');

/**
 * creates a user using User model
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {User}
 */
function create(req, res, next) {
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

module.exports = { create, get, list, update, remove };
