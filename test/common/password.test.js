const expect = require('chai').expect;
const password = require('./../../src/common/password');

describe('Password utility', () => {
  it('should compare hashed password', (done) => {
    const pass = '1234!@esdWQW';
    password.hash(pass).then((hash) => {
      password.compare(pass, hash).then((equals) => {
        expect(equals).to.be.true;
        done();
      });
    });
  });
});
