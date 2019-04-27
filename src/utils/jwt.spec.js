import { getJWT } from './jwt';

jest.mock('../config', () => ({
  jwtExpiration: '25920000000',
  jwtEncryption: 'h7dl0skFjCMg902JQLCaP'
}));

const user = {
  uuid: null,
  user_role_code: null,
  company_uuid: null,
  status: null
};

describe('Given getJWT', () => {
  describe('when it is called', () => {
    it('should return Bearer token', () => {
      expect(getJWT(user)).toContain('Bearer');
      expect(getJWT(user).length).toBeGreaterThan(30);
    });
  });
});
