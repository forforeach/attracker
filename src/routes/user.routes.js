const express = require('express');
const UserController = require('./../controllers/user.controller');
const credentialsMiddleware = require('./../middlewares/credentials-required.middleware');

const router = express.Router();

router.post('/register', UserController.register);
router.get('/', UserController.list);
router.get('/:id', UserController.get);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);
router.post('/authenticate', credentialsMiddleware,  UserController.authenticate);

module.exports = (apiRouter) => apiRouter.use('/users', router);
