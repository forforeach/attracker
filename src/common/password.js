const bcrypt = require('bcrypt');

const saltRounds = 10;


/**
 * hashes a password with sal
 *
 * @param {String} password
 * @return {Promise<String>}
 */
const hash = (password) => bcrypt.hash(password, saltRounds);

/**
 * compares hashed password with original password string
 *
 * @param {String} password
 * @param {String} hash
 * @return {Promise<Boolean>}
 */
const compare = (password, hash) => bcrypt.compare(password, hash);

module.exports = { hash, compare };
