const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('./../../src/app');

const User = mongoose.model('user');
const expect = chai.expect;
chai.config.includeStack = true;

describe('User controller', () => {
  let token;
  before((done) => {
    const user = new User({
      email: 'main@test.com',
      userName: 'username',
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => {
        request(app)
          .post('/api/users/authenticate')
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

  it('POST to /api/users/register should create a new user', (done) => {
    const userProps = {
      email: 'test@test.com',
      userName: 'username',
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    };
    request(app)
      .post('/api/users/register')
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

  it('GET to /api/users/:id should retrieve a user', (done) => {
    const user = new User({
      email: 'test@test.com',
      userName: 'username',
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => {
        request(app)
          .get(`/api/users/${user._id}`)
          .set('Authorization', 'Bearer ' + token)
          .then((res) => {
            // console.log(res);
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
      userName: 'username',
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

  it('PUT to /api/users/:id should update a user', (done) => {
    const user = new User({
      email: 'test@test.com',
      userName: 'username',
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => request(app)
        .put(`/api/users/${user._id}`)
        .set('Authorization', 'Bearer ' + token)
        .send({ firstName: 'Joe' }))
      .then(() => User.findById(user._id))
      .then((dbUser) => {
        expect(dbUser.firstName).to.be.equal('Joe');
        done();
      });
  });

  it('DELETE to /api/users/:id should remove a user', (done) => {
    const user = new User({
      email: 'testq@test.com',
      userName: 'username',
      firstName: 'test',
      lastName: 'user',
      password: 'password'
    });
    user.save()
      .then(() => request(app)
        .delete(`/api/users/${user._id}`)
        .set('Authorization', 'Bearer ' + token)
      )
      .then(() => User.findById(user._id))
      .then((dbUser) => {
        expect(dbUser).to.be.null;
        done();
      });
  });
});
