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


module.exports = { createUserToken };
