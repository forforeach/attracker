const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('./../../src/app');

const User = mongoose.model('user');
const expect = chai.expect;
chai.config.includeStack = true;

describe('User controller', () => {
  let token;
  let userName = 'username';
  before((done) => {
    const user = new User({
      email: 'main@test.com',
      userName,
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => {
        request(app)
          .post('/api/auth/authenticate')
          .send({
            email: 'main@test.com',
            password: 'password'
          })
          .then((res) => {
            token = res.body.token;
            done();
          });
      });
  });

  it('GET to /api/users/:username should retrieve a user', (done) => {
    const user = new User({
      email: 'test@test.com',
      userName,
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => {
        request(app)
          .get(`/api/users/${user.userName}`)
          .set('Authorization', 'Bearer ' + token)
          .then((res) => {
            expect(res.body).not.to.be.null;
            expect(res.body.email).to.be.equal(user.email);
            expect(res.body._id.toString()).to.be.equal(user._id.toString());
            expect(res.body.password).to.be.undefined;
            done();
          });
      });
  });

  it('GET to /api/users should retrieve all users', (done) => {
    const user = new User({
      email: 'test@test.com',
      userName,
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => {
        request(app)
          .get(`/api/users`)
          .set('Authorization', 'Bearer ' + token)
          .then((res) => {
            expect(res.body).not.to.be.null;
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(1);
            expect(res.body[0]._id.toString()).to.be.equal(user._id.toString());
            expect(res.body[0].password).to.be.undefined;
            done();
          });
      });
  });

  it('PUT to /api/users/:username should update a user', (done) => {
    const user = new User({
      email: 'test@test.com',
      userName,
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => request(app)
        .put(`/api/users/${user.userName}`)
        .set('Authorization', 'Bearer ' + token)
        .send({ firstName: 'Joe' }))
      .then(() => User.findOne({ userName: user.userName }))
      .then((dbUser) => {
        expect(dbUser.firstName).to.be.equal('Joe');
        done();
      });
  });

  it('DELETE to /api/users/:username should remove a user', (done) => {
    const user = new User({
      email: 'testq@test.com',
      userName,
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => request(app)
        .delete(`/api/users/${user.userName}`)
        .set('Authorization', 'Bearer ' + token)
      )
      .then(() => User.findOne({ userName: user.userName }))
      .then((dbUser) => {
        expect(dbUser).to.be.null;
        done();
      });
  });
});
