const User = require('./../models/user');


module.exports = {

  create(req, res, next) {
    res.send('create');
  },

  get(req, res, next) {
    res.send('get');
  },

  getAll(req, res, next) {
    res.send('getAll');
  },

  update(req, res, next) {
    res.send('update');
  },

  delete(req, res, next) {
    res.send('delete');
  }
};
