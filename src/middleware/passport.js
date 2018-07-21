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
            id: jwtPayload.userID,
          },
        });
        const userCompany = await db.UserCompany.findOne({
          where: {
            id: jwtPayload.userID,
          },
        });
        if (!user || !userCompany) {
          return done(null, false);
        }
        const formattedUser = {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          userRoleCode: user.user_role_code,
          companyId: userCompany.company_id,
          status: user.status,
        };
        return done(null, formattedUser);
      } catch (err) {
        console.log(err, 'Error setting up passport strategy'); // @todo handle errors - this error would happen on app init
      }
    }),
  );
};
