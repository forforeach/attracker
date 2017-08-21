const express = require('express');
const UserController = require('./../controllers/user.controller');
const credentialsMiddleware = require('./../middlewares/credentials-required.middleware');

const router = express.Router();

router.post('/register', UserController.register);
router.get('/', UserController.list);
/**
 * @api {get} /user/:id Retrieve a single user
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstName Firstname of the User.
 * @apiSuccess {String} lastName  Lastname of the User.
 * @apiSuccess {String} userName  Username of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {Date} updatedAt  The date user was updated last time.
 * @apiSuccess {Date} createdAt  The date user was created.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "userName": "jondoe",
 *       "email": "jondoe@mail.com",
 *       "updatedAt": "2017-08-19 19:17:36.515Z",
 *       "createdAt": "2017-08-19 19:17:36.515Z"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
router.get('/:id', UserController.get);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);
router.post('/authenticate', credentialsMiddleware,  UserController.authenticate);

module.exports = (apiRouter) => apiRouter.use('/users', router);
