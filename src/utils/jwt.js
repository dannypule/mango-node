import jwt from 'jsonwebtoken';
import config from '../config';

const { jwtExpiration, jwtEncryption } = config;

export const getJWT = user => {
  const expirationTime = parseInt(jwtExpiration, 10);
  const token = jwt.sign(
    {
      userUuid: user.uuid,
      userRoleCode: user.user_role_code,
      companyUuid: user.company_uuid,
      verified: user.verified,
      status: user.status,
    },
    jwtEncryption,
    {
      expiresIn: expirationTime,
    },
  );

  return `Bearer ${token}`;
};
