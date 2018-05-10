import db from '../../db-models'
import { formatFromDb, addUser } from './UsersService'
import utils from '../../utils'

const UserController = {}

UserController.getUsers = async (req, res) => {
  try {
    const limit = 15 // number of records per page

    const {
      page = 1, // page 1 default
      userId = undefined, // undefined by default
    } = req.query

    const offset = limit * (page - 1) // define offset

    // default db query
    const dbQuery = {
      limit,
      offset,
      $sort: { id: 1 },
    }

    // ability to search by userId
    if (userId) {
      dbQuery.where = {
        id: parseInt(userId, 10),
      }
    }

    const users = await db.User.findAndCountAll(dbQuery)

    const pages = Math.ceil(users.count / limit)
    const formatted = users.rows.map(formatFromDb)
    utils.success(res, { users: formatted, count: users.count, pages, page })
  } catch (err) {
    utils.success(res, err)
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
