const User = require('./../models/user');


module.exports = {

  create(req, res, next) {
    const userProps = req.body;
    User.create(userProps)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  },

  get(req, res, next) {
    const { id } = req.params;
    User.findById(id)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  },

  getAll(req, res, next) {
    User.find({})
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  },

  update(req, res, next) {
    const { id } = req.params;
    const userProps = req.body;
    User.findByIdAndUpdate(id, userProps)
      .then(() => User.findById(id))
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  },

  delete(req, res, next) {
    const { id } = req.params;
    User.findByIdAndRemove(id)
      .then(() => res.status(204).send())
      .catch(next);
  }
};
