import db from '../../db-models'
import { formatGetUserResponse, addUser } from './UsersService'
import utils from '../../utils'

const UserController = {}

UserController.getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll()
    const formattedUsers = users.map(formatGetUserResponse)
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
    const userWasDeleted = await db.User.destroy({
      where: {
        email: req.body.email,
      },
    })
    if (userWasDeleted === 1) {
      utils.success(res)
    } else {
      utils.fail(res, { message: 'No user found.' })
    }
  } catch (err) {
    utils.fail(res, err)
  }
}

export default UserController
