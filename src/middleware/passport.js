import passportJWT from 'passport-jwt'
import db from '../db-schema'
import config from '../config'

const { ExtractJwt, Strategy } = passportJWT

module.exports = passport => {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.jwt_encryption

  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      db.Users.findOne({
        where: {
          UserID: jwtPayload.userID
        }
      })
        .then(user => {
          console.log('user', user)
          if (user) {
            return done(null, user)
          }
          done(null, false)
        })
        .catch(err => {
          debugger
          console.log(err) // @todo handle errors
        })
    })
  )
}
