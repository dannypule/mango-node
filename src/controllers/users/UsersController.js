import db from '../../models'
import { formatGetUserResponse, addUser } from './UsersService'
import utils from '../../utils/utils'

const UserController = {}

UserController.getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll()
    const formattedUsers = users.map(formatGetUserResponse)
    utils.success(res, formattedUsers)
  } catch (err) {
    utils.error(res, err)
  }
}

UserController.addUser = (req, res) => {
  const user = req.body

  addUser(req, res, user)
}

UserController.deleteUser = async (req, res) => {
  try {
    const deletedUser = await db.User.destroy({
      where: {
        email: req.body.email,
      },
    })
    utils.success(res, deletedUser) // todo - still returns ok even if can't find the user
  } catch (err) {
    utils.error(res, err)
  }
}

export default UserController
