import { getJWT } from './jwt';
import * as config from '../config';

config.default = {
  jwt_expiration: '25920000000',
  jwt_encryption: 'h7dl0skFjCMg902JQLCaP',
};
const user = {
  uuid: null,
  user_role_code: null,
  company_uuid: null,
  status: null,
};

describe('Given getJWT', () => {
  describe('when it is called', () => {
    it('should return Bearer token', () => {
      expect(getJWT(user)).toContain('Bearer');
      expect(getJWT(user).length).toBeGreaterThan(30);
    });
  });
});
