import passportJWT from 'passport-jwt';
import db from '../db_models';
import config from '../config';

const { ExtractJwt, Strategy } = passportJWT;

module.exports = passport => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt_encryption,
  };

  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      try {
        const user = await db.User.findOne({
          where: {
            uuid: jwtPayload.userUuid,
          },
        });
        if (!user || user.status !== 'ACTIVE') {
          // @todo - to scale up we would need a redis cache-based solution instead of querying the db
          return done(null, false);
        }
        const userFromJwtPayload = {
          uuid: jwtPayload.userUuid,
          userRoleCode: jwtPayload.userRoleCode,
          companyUuid: jwtPayload.companyUuid,
          verified: jwtPayload.verified,
          status: jwtPayload.status,
        };
        return done(null, userFromJwtPayload);
      } catch (err) {
        console.log(err, 'Error setting up passport strategy'); // @todo handle errors - this error would happen on app init
      }
    }),
  );
};
