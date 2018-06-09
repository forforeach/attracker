const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('./../../src/app');

const User = mongoose.model('user');
const expect = chai.expect;
chai.config.includeStack = true;

describe('Auth controller', () => {
  it('POST to /api/auth/register should create a new user', (done) => {
    const userProps = {
      email: 'test@test.com',
      userName: 'username',
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    };
    request(app)
      .post('/api/auth/register')
      .send(userProps)
      .end(() => {
        User.findOne({ email: userProps.email })
          .then((user) => {
            expect(user).not.to.be.null;
            expect(user.email).to.be.equal(userProps.email);
            done();
          }).catch((error) => console.log(error));
      });
  });
});
