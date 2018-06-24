/**
 * Configuration of access tokens.
 *
 * expiresIn - The time in seconds before the access token expires. Default is 60 minutes
 */
exports.accessToken = {
  expiresIn: 60 * 60,
};

/**
 * Configuration of refresh token.
 *
 * expiresIn - The time in minutes before the code token expires.  Default is 1 year.
 */
exports.refreshToken = {
  expiresIn : 60 * 60 * 24 * 365,
};
