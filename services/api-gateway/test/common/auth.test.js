const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const rewire = require('rewire');
const auth = rewire('./../../src/auth/utils');


describe('Auth utils: ', () => {
  describe('generateTokens(): ', () => {

    const mockJTI = '111';

    beforeEach('mocks', () => {
      const mockRefreshToken = function () { };
      mockRefreshToken.prototype.save = () => Promise.resolve();
      auth.__set__('RefreshToken', mockRefreshToken);

      const mockAccessToken = function () { };
      mockAccessToken.prototype.save = () => Promise.resolve();
      auth.__set__('AccessToken', mockAccessToken);

      const mockUuid = () => mockJTI;
      auth.__set__('uuid', mockUuid);
    });

    it('should generate access and refresh tokens', (done) => {
      const mockUserId = 'userid';
      const user = { name: 'dsdfjfd', id: mockUserId };
      const clientId = 'clientId';
      const scope = 'scope';
      auth.generateTokens({ user, clientId, scope })
        .then(([accessToken, refreshToken]) => {
          const accessTokenDecoded = jwt.decode(accessToken);
          const refreshTokenDecoded = jwt.decode(refreshToken);

          expect(accessTokenDecoded.name).to.be.equal(user.name);
          expect(accessTokenDecoded.jti).to.be.equal(mockJTI);
          expect(refreshTokenDecoded.userId).to.be.equal(mockUserId);
          expect(refreshTokenDecoded.jti).to.be.equal(mockJTI);

          done();
        });
    });
  });

  describe('removePasswordProp(): ', () => {

    it('should remove password property from passed object', () => {
      const mockObj = {
        foo: 'bar',
        password: 'p@ssword',
      };
      const resultObj = auth.removePasswordProp(mockObj);
      expect(resultObj).not.to.be.equal(mockObj);
      expect(resultObj.password).to.be.undefined;

      for (let prop in mockObj) {
        if (prop !== 'password') {
          expect(resultObj[prop]).not.to.be.undefined;
          expect(resultObj[prop]).to.be.equal(mockObj[prop]);
        }
      }

    });
  });
});
