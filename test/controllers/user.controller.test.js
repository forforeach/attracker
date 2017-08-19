const mongoose = require('mongoose');
const request = require('supertest');
const assert = require('assert');
const app = require('./../../src/app');

const User = mongoose.model('user');

describe('User controller', () => {
  it('POST to /api/users should create a new user', (done) => {
    const userProps = {
      email: 'test@test.com',
      userName: 'username',
      firstName: 'test',
      lastName: 'user'
    };
    request(app)
      .post('/api/users')
      .send(userProps)
      .end(() => {
        User.findOne({ email: userProps.email })
          .then((user) => {
            assert(user !== null);
            assert(user.email === userProps.email);
            done();
          }).catch((error) => console.log(error));
      });
  });
});
