const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('./../../src/app');

const User = mongoose.model('user');
const Client = mongoose.model('client');
const expect = chai.expect;
chai.config.includeStack = true;

describe('User controller', () => {
  let accessToken;
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
  beforeEach((done) => {
    const client = new Client(clientData);
    client.save().then(() => {

      const user = new User(userData);
      user.save()
        .then(() => {
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
            .then((res) => {
              accessToken = res.body.access_token;
              done();
            });
        });
    });
  });

  it('GET to /api/users/:username should retrieve a user', (done) => {

    request(app)
      .get(`/api/users/${userData.userName}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .then((res) => {
        expect(res.body).not.to.be.null;
        expect(res.body.email).to.be.equal(userData.email);
        expect(res.body.password).to.be.undefined;
        done();
      });
  });

  it('GET to /api/users should retrieve all users', (done) => {
    request(app)
      .get(`/api/users`)
      .set('Authorization', 'Bearer ' + accessToken)
      .then((res) => {
        expect(res.body).not.to.be.null;
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
        expect(res.body[0].password).to.be.undefined;
        done();
      });
  });

  it('PUT to /api/users/:username should update a user', (done) => {
    const userName = 'user2';
    const user = new User({
      email: 'test@test.com',
      userName: userName,
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => request(app)
        .put(`/api/users/${userName}`)
        .set('Authorization', 'Bearer ' + accessToken)
        .send({ firstName: 'Joe' }))
      .then(() => User.findOne({ userName: userName }))
      .then((dbUser) => {
        expect(dbUser.firstName).to.be.equal('Joe');
        done();
      });
  });

  it('DELETE to /api/users/:username should remove a user', (done) => {
    const userName = 'user2';
    const user = new User({
      email: 'testq@test.com',
      userName,
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => request(app)
        .delete(`/api/users/${userName}`)
        .set('Authorization', 'Bearer ' + accessToken)
      )
      .then(() => User.findOne({ userName }))
      .then((dbUser) => {
        expect(dbUser).to.be.null;
        done();
      });
  });
});
