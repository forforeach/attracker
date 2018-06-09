const expect = require('chai').expect;
const password = require('./../../src/common/password');

describe('Password utility', () => {
  it('should compare hashed password', (done) => {
    const pass = '1234!@esdWQW';
    password.hash(pass)
      .then((hash) => password.compare(pass, hash))
      .then((equals) => {
        expect(equals).to.be.true;
        done();
      })
      .catch((err) => console.log(err));
  });
  it('should fail to compare different hashed passwords', (done) => {
    const originalPass = '1234!@esdWQW';
    const comparedPass = '13927!!@@@3@3';
    password.hash(originalPass)
      .then((hash) => password.compare(comparedPass, hash))
      .then((equals) => {
        expect(equals).to.be.false;
        done();
      })
      .catch((err) => console.log(err));
  });
});
