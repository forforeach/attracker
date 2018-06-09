const express = require('express');
const AuthController = require('./../controllers/auth.controller');
const credentialsHandler = require('./../middlewares/credentials-required-handler');

const router = express.Router();

/**
 * @api {post} /auth/register Register a new user
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam {String} userName User email.
 * @apiParam {String} email User email.
 * @apiParam {String} password User password.
 *
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userName": "jondoe",
 *       "email": "jondoe@mail.com",
 *       "updatedAt": "2017-08-19 19:17:36.515Z",
 *       "createdAt": "2017-08-19 19:17:36.515Z"
 *     }
 */
router.post('/register', AuthController.register);
/**
 * @api {post} /auth/authencticate Authenticate a user
 * @apiName Authenticate
 * @apiGroup Auth
 *
 * @apiParam {String} email User email.
 * @apiParam {String} password User password.
 *
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "THE_AUTHENTICATION_TOKEN"
 *     }
 *
 * @apiError (404) UserNotFound The User was not found.
 * @apiError (401) Unauthorized The password was wrong.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
router.post('/authenticate', credentialsHandler,  AuthController.authenticate);

module.exports = (apiRouter) => apiRouter.use('/auth', router);
