import bcrypt from 'bcrypt'
import db from '../../db-models'
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

    if (!user) utils.fail(res, { message: `Couldn't log in.` })

    bcrypt.compare(req.body.password, user.password, (err, r) => {
      if (err) {
        utils.fail(res, err)
        return
      }
      if (r) {
        utils.success(res, { token: user.getJWT(user) })
      } else {
        utils.fail(res, { message: `Couldn't log in.` }, 403)
      }
    })
  } catch (err) {
    utils.fail(res, err)
  }
}

AuthController.register = (req, res) => {
  const user = req.body

  addUser(req, res, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    companyId: 1, // todo - make dynamic
    userRoleCode: 30, // basic user
  })
}

export default AuthController
