const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const appConfig = require('./../../configs/app.config');
const oauth2config = require('./../../configs/oauth2.config');
const AccessToken = require('./../models/accessToken');
const RefreshToken = require('./../models/refreshToken');

const createToken = (payload, secret, expiresIn) => (
  jwt.sign(payload, secret, {
    expiresIn,
    jwtid: uuid()
  })
);

const calculateExpirationDate = (expiresIn) => {
  const exDate = new Date();
  exDate.setSeconds(exDate.getSeconds() + expiresIn);
  return exDate;
};

const generateAccessToken = (user, clientId, scope) => {
  const { expiresIn } = oauth2config.accessToken;
  const token = createToken(user, appConfig.auth.secret, oauth2config.accessToken.expiresIn);
  const tokenId = jwt.decode(token).jti;
  const accessTokenModel = new AccessToken({
    userId: user.id,
    expirationDate: calculateExpirationDate(expiresIn),
    clientId,
    scope,
    tokenId,
  });
  return accessTokenModel.save().then(() => token);
};

const generateRefreshToken = (userId, clientId, scope) => {
  const { expiresIn } = oauth2config.accessToken;
  const token = createToken({ userId }, appConfig.auth.secret, oauth2config.refreshToken.expiresIn);
  const tokenId = jwt.decode(token).jti;
  const refreshTokenModel = new RefreshToken({
    userId: userId,
    expirationDate: calculateExpirationDate(expiresIn),
    clientId,
    scope,
    tokenId,
  });
  return refreshTokenModel.save().then(() => token);
};

const generateTokens = ({ user, clientId, scope }) => (
  Promise.all([
    generateAccessToken(user, clientId, scope),
    generateRefreshToken(user.id, clientId, scope),
  ])
);

const removePasswordProp = (obj) => {
  let newObj = Object.assign({}, obj, { password: null });
  delete newObj.password;
  return newObj;
};

const verifyToken = (token) => (
  new Promise((resolve, reject) => {
    jwt.verify(token, appConfig.auth.secret, (err, decodedToken) => {
      err ? reject('Token is not valid') : resolve(decodedToken);
    });
  })
);

const validateRefreshToken = (token, refreshToken, clientId) => (
  verifyToken(refreshToken)
    .then(() => {
      if (clientId !== token.clientId) {
        throw new Error('RefreshToken clientID does not match client id given');
      }
    })
    .then(() => token)
);

module.exports = {
  removePasswordProp,
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  verifyToken,
  validateRefreshToken,
};
