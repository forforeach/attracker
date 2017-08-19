const UserController = require('./../controllers/user.controller');
const express = require('express');

const router = express.Router();

router.post('/', UserController.create);
router.get('/', UserController.list);
router.get('/:id', UserController.get);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);

module.exports = (apiRouter) => apiRouter.use('/users', router);
