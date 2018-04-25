import bcrypt from 'bcrypt'
import db from '../../models'
import utils from '../../utils/utils'
import { addUser } from '../users/UsersService'

const AuthController = {}

AuthController.login = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        email: req.body.email,
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

AuthController.register = (req, res) => {
  const user = req.body

  addUser(req, res, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    password: user.password,
    companyId: 1, // todo - make dynamic
    userRoleCode: 30, // basic user
  })
}

export default AuthController
