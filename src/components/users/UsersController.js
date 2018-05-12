import db from '../../db-models'
import { formatFromDb, addUser } from './UsersService'
import utils from '../../utils'

const UserController = {}

UserController.getUsers = async (req, res) => {
  try {
    const limit = 15 // number of records per page

    const {
      page = 1, // page 1 default
      id = undefined, // undefined by default
    } = req.query

    const offset = limit * (page - 1) // define offset

    // default db query
    const dbQuery = {
      where: {},
      limit,
      offset,
      $sort: { id: 1 },
    }

    // ability to search by id
    if (id) {
      dbQuery.where = {
        ...dbQuery.where,
        id: parseInt(id, 10),
      }
    }

    const data = await db.User.findAndCountAll(dbQuery)

    const pages = Math.ceil(data.count / limit)
    const formatted = data.rows.map(formatFromDb)
    utils.success(res, { data: formatted, count: data.count, pages, page })
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
