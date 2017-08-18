const UserController = require('./../controllers/user.controller');
const express = require('express');

const router = express.Router();

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.get);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = (apiRouter) => apiRouter.use('/users', router);
