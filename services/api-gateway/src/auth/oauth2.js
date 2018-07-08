const oauth2orize = require('oauth2orize');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const oauth2config = require('./../../configs/oauth2.config');
const auth = require('./utils');
const AuthUser = require('./../models/AuthUser');
const RefreshToken = require('../models/RefreshToken');

// create OAuth 2.0 server
const server = oauth2orize.createServer({ userProperty: 'client' });

// Configured expiresIn
const expiresIn = { expires_in: oauth2config.accessToken.expiresIn };


/**
 * Exchange user id and password for access tokens.
 *
 * The callback accepts the `client`, which is exchanging the user's name and password
 * from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the user who authorized the code.
 */
server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  const queryFields = {
    userName: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    password: 1
  };
  AuthUser.findOne({ userName: username }, queryFields)
    .then((user) => user ? user.validatePassword(password) : done(null, false))
    .then((user) => {
      const userObject = auth.removePasswordProp(user.toClientObject());
      return auth.generateTokens({ user: userObject, clientId: client.clientId, scope });
    })
    .then(([accessToken, refreshToken]) => done(null, accessToken, refreshToken, expiresIn))
    .catch(() => done(null, false));
}));


/**
 * Exchange the refresh token for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id from the token
 * request for verification.  If this value is validated, the application issues an access
 * token on behalf of the client who authorized the code
 */
server.exchange(oauth2orize.exchange.refreshToken(({ clientId }, refreshToken, scope, done) => {
  const { jti: tokenId, userId } = jwt.decode(refreshToken);
  RefreshToken.findOne({ tokenId, clientId: clientId })
    .then((foundToken) => auth.validateRefreshToken(foundToken, refreshToken, clientId))
    .then(() => AuthUser.findById(userId))
    .then((user) => auth.generateAccessToken(user.toClientObject(), clientId, scope))
    .then((accessToken) => done(null, accessToken, refreshToken, expiresIn))
    .catch(() => done(null, false));
}));

/**
 * Token endpoint
 *
 * `token` middleware handles client requests to exchange authorization grants
 * for access tokens.  Based on the grant type being exchanged, the above
 * exchange middleware will be invoked to handle the request.  Clients must
 * authenticate when making requests to this endpoint.
 */
exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler(),
];
