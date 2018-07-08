const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('./../../src/app').app;

const AuthUser = mongoose.model('authuser');
const Client = mongoose.model('client');
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
        AuthUser.findOne({ email: userProps.email })
          .then((user) => {
            expect(user).not.to.be.null;
            expect(user.email).to.be.equal(userProps.email);
            done();
          }).catch((error) => console.log(error));
      });
  });

  it('POST to api/auth/token with refresh_token should return new access_token', (done) => {
    let refreshToken;
    let userData = {
      email: 'main@test.com',
      userName: 'username',
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    };
    let clientData = {
      name: 'test-app',
      clientId: 'test-app',
      secret: '123456'
    };
    const client = new Client(clientData);
    client.save()
      .then(() => new AuthUser(userData))
      .then((user) => user.save())
      .then(() => (
        request(app)
          .post('/api/auth/token')
          .send({
            username: userData.userName,
            password: userData.password,
            grant_type: 'password',
            scope: '*',
            client_id: clientData.clientId,
            client_secret: clientData.secret
          })
          .then((res) => refreshToken = res.body.refresh_token)
          .then(() => (
            request(app)
              .post('/api/auth/token')
              .send({
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
                scope: '*',
                client_id: clientData.clientId,
                client_secret: clientData.secret
              }))
            .then((res) => {
              expect(res.body.access_token).not.to.be.undefined;
              done();
            }))));
  });
});
