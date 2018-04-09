import bcrypt from 'bcrypt'
import db from '../../models'
import utils from '../../utils/utils'

const AuthController = {}

AuthController.login = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        Username: req.body.username,
      },
    })
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
  } catch (err) {
    utils.error(res, { status: `Couldn't log in` })
  }
}

export default AuthController
