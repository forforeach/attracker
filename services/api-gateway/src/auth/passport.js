const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { BasicStrategy } = require('passport-http');
const { Strategy: ClientPasswordStrategy } = require('passport-oauth2-client-password');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const AuthUser = require('./../models/authUser');
const Client = require('./../models/client');
const AccessToken = require('./../models/accessToken');
const authUtils = require('./../auth/utils');

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy((username, password, done) => {
  const queryFields = {
    userName: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    password: 1
  };
  AuthUser.findOne({ userName: username }, queryFields)
    .then((user) => {
      if (user === null) {
        throw new Error('User not found');
      } else {
        return user.validatePassword(password);
      }
    })
    .then((user) => done(null, user))
    .catch(() => done(null, false));
}));

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy((clientId, clientSecret, done) => {
  Client.findOne({ clientId })
    .then((client) => client.validateSecret(clientSecret))
    .then((client) => done(null, client))
    .catch(() => done(null, false));
}));

/**
 * Client Password strategy
 *
 * The OAuth 2.0 client password authentication strategy authenticates clients
 * using a client ID and client secret. The strategy requires a verify callback,
 * which accepts those credentials and calls done providing a client.
 */
passport.use(new ClientPasswordStrategy((clientId, clientSecret, done) => {
  Client.findOne({ clientId })
    .then((client) => client.validateSecret(clientSecret))
    .then((client) => done(null, client))
    .catch(() => done(null, false));
}));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 *
 */
passport.use(new BearerStrategy((accessToken, done) => {
  authUtils.verifyToken(accessToken)
    .then((decodedToken) => decodedToken.jti)
    .then((tokenId) => AccessToken.findOne({ tokenId }))
    .then((token) => AuthUser.findOne({ _id: token.userId }).then((user) => ({ user, token })))
    .then(({ user, token }) => user ? token : done(null, false))
    .then((token) => done(null, token, { scope: '*' }))
    .catch(() => done(null, false));
}));
