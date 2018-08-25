import jwt from 'jsonwebtoken';
import config from '../config';

export const getJWT = user => {
  const expirationTime = parseInt(config.jwt_expiration, 10);
  const token = jwt.sign({
    userId: user.id,
    userRoleCode: user.user_role_code,
    companyId: user.company_id,
    status: user.status,
  }, config.jwt_encryption, {
    expiresIn: expirationTime,
  });
  return `Bearer ${token}`;
};

