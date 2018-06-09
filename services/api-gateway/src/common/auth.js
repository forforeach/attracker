const jwt = require('jsonwebtoken');

const createUserToken = (user, secret) => (
  new Promise((resolve, reject) => {
    jwt.sign(user, secret, {
      expiresIn: 60 * 15
    }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  })
);

const getUserWithoutPassword = (user) => {
  let newUser = Object.assign({}, user, { password: null });
  delete newUser.password;
  return newUser;
};


module.exports = { createUserToken, getUserWithoutPassword };
