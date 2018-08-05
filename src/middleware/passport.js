import passportJWT from 'passport-jwt';
import db from '../db_models';
import config from '../config';

const { ExtractJwt, Strategy } = passportJWT;

module.exports = passport => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.jwt_encryption;

  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      try {
        const user = await db.User.findOne({
          where: {
            id: jwtPayload.userId,
          },
        });
        if (!user || user.status !== 'ACTIVE') {
          return done(null, false);
        }
        const formattedUser = {
          id: jwtPayload.userId,
          userRoleCode: jwtPayload.userRoleCode,
          companyId: jwtPayload.companyId,
          status: jwtPayload.status,
        };
        return done(null, formattedUser);
      } catch (err) {
        console.log(err, 'Error setting up passport strategy'); // @todo handle errors - this error would happen on app init
      }
    }),
  );
};
