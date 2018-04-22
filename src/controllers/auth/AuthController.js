import bcrypt from 'bcrypt'
import db from '../../models'
import utils from '../../utils/utils'

const AuthController = {}

AuthController.login = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        username: req.body.username,
      },
    })

    if (!user) utils.error(res, { status: `Couldn't log in.` })

    bcrypt.compare(req.body.password, user.password, (err, r) => {
      if (err) {
        utils.error(res)
        return
      }
      if (r) {
        utils.success(res, { token: user.getJWT(user) })
      } else {
        utils.error(res, { status: `Couldn't log in.` })
      }
    })
  } catch (err) {
    utils.error(res, { err, status: `Couldn't log in.` })
  }
}

export default AuthController
