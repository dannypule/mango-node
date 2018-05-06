import passportJWT from 'passport-jwt'
import db from '../db-models'
import config from '../config'

const { ExtractJwt, Strategy } = passportJWT

module.exports = passport => {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.jwt_encryption

  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      try {
        const user = await db.User.findOne({
          where: {
            id: jwtPayload.userID,
          },
        })
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      } catch (err) {
        console.log(err, 'Error setting up passport strategy') // @todo handle errors - this error would happen on app init
      }
    }),
  )
}
