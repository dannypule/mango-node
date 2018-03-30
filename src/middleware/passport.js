import passportJWT from 'passport-jwt'
import models from '../db-schema'
import config from '../config'

const { ExtractJwt, Strategy } = passportJWT
const { Users } = models

module.exports = passport => {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.jwt_encryption

  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      // let err, user
      // ;[err, user] = await User.findById(jwt_payload.userID)

      Users.findById(jwtPayload.userID)
        .then((err, user) => {
          console.log('user', user.id)
          if (err) return done(err, false)
          if (user) {
            return done(null, user)
          }
          done(null, false)
        })
        .catch(err => {
          console.log(err) // @todo handle errors
        })
    })
  )
}
