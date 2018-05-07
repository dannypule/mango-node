import db from '../../db-models'
import { formatDbResponse, addUser } from './UsersService'
import utils from '../../utils'

const UserController = {}

UserController.getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll()
    const formattedUsers = users.map(formatDbResponse)
    utils.success(res, formattedUsers)
  } catch (err) {
    utils.fail(res, err)
  }
}

UserController.addUser = (req, res) => {
  const user = req.body

  addUser(req, res, user)
}

UserController.deleteUser = async (req, res) => {
  try {
    const result = await db.User.destroy({
      where: {
        email: req.body.email,
      },
    })
    if (result === 1) {
      utils.success(res)
    } else {
      utils.fail(res, { message: 'Unable to delete this user.' })
    }
  } catch (err) {
    utils.fail(res, err)
  }
}

export default UserController
