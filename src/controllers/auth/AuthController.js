import bcrypt from 'bcrypt'
import db from '../../models'
import utils from '../../utils/utils'

const AuthController = {}

AuthController.login = async (req, res) => {
  db.Users.findOne({
    where: {
      Username: req.body.username,
    },
  })
    .then(user => {
      bcrypt.compare(req.body.password, user.Password, (err, r) => {
        if (err) {
          utils.success(res)
          return
        }
        if (r) {
          utils.success(res, { token: user.getJWT(user) })
        } else {
          utils.error(res, { status: `Couldn't log in` })
        }
      })
    })
    .catch(err => {
      utils.error(err, { status: `Couldn't log in` })
    })
}

export default AuthController
