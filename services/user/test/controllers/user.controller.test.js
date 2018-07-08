const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('./../../src/app').app;

const User = mongoose.model('user');
const expect = chai.expect;
chai.config.includeStack = true;

describe('User controller', () => {
  let accessToken;
  let userData = {
    email: 'main@test.com',
    userName: 'username',
    firstName: 'test',
    lastName: 'user',
  };

  beforeEach((done) => {
    const user = new User(userData);
    user.save().then(() => done()).catch(console.error);
  });

  it('GET to /:username should retrieve a user', (done) => {

    request(app)
      .get(`/${userData.userName}`)
      .then((res) => {
        expect(res.body).not.to.be.null;
        expect(res.body.email).to.be.equal(userData.email);
        expect(res.body.firstName).to.be.equal(userData.firstName);
        expect(res.body.lastName).to.be.equal(userData.lastName);
        done();
      });
  });

  it('GET to / should retrieve all users', (done) => {
    request(app)
      .get(`/`)
      .set('Authorization', 'Bearer ' + accessToken)
      .then((res) => {
        expect(res.body).not.to.be.null;
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
        expect(res.body[0].password).to.be.undefined;
        done();
      });
  });

  it('PUT to /:username should update a user', (done) => {
    const firstName = 'Joe';
    request(app)
      .put(`/${userData.userName}`)
      .send({ firstName })
      .then(() => User.findOne({ userName: userData.userName }))
      .then((user) => {
        expect(user.firstName).to.be.equal(firstName);
        done();
      });
  });

  it('DELETE to /:username should remove a user', (done) => {
    request(app)
      .delete(`/${userData.userName}`)
      .then(() => User.findOne({ userName: userData.userName }))
      .then((dbUser) => {
        expect(dbUser).to.be.null;
        done();
      });
  });
});
