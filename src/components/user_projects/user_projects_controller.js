import db from '../../db_models'
import { formatFromDb, formatForDb } from './user_projects_service'
import utils from '../../utils'

const UserProjectsController = {}
const model = db.UserProject

UserProjectsController.getUserProjects = async (req, res) => {
  try {
    const limit = 15 // number of records per page

    const { id, projectId, userId } = req.query

    const page = parseInt(req.query.page, 10) || 1 // page 1 default

    const offset = limit * (page - 1) // define offset

    // default db query
    const dbQuery = {
      where: {},
      limit,
      offset,
      order: [['id', 'DESC']],
    }

    // ability to search by id
    if (id !== undefined) {
      dbQuery.where = {
        ...dbQuery.where,
        id: parseInt(id, 10),
      }
    }

    // ability to search by projectId
    if (projectId !== undefined) {
      dbQuery.where = {
        ...dbQuery.where,
        project_id: parseInt(projectId, 10),
      }
    }

    // ability to search by userId
    if (userId !== undefined) {
      dbQuery.where = {
        ...dbQuery.where,
        user_id: parseInt(userId, 10),
      }
    }
    const userProjects = await model.findAndCountAll(dbQuery)

    const pages = Math.ceil(userProjects.count / limit)
    const formatted = userProjects.rows.map(formatFromDb)
    utils.success(res, { userProjects: formatted, count: userProjects.count, pages, page })
  } catch (err) {
    utils.success(res, err)
  }
}

UserProjectsController.addUserProject = async (req, res) => {
  const formatted = formatForDb(req.body)

  try {
    const userProject = await model.create(formatted)
    utils.success(res, { userProject: formatFromDb(userProject) })
  } catch (err) {
    utils.fail(res, err)
  }
}

UserProjectsController.updateUserProject = async (req, res) => {
  const userProject = req.body

  try {
    await model.update(formatForDb(userProject), {
      where: {
        id: userProject.id,
      },
    })
    const updated = await model.findOne({
      where: {
        id: req.body.id,
      },
    })
    utils.success(res, { userProject: formatFromDb(updated) })
  } catch (err) {
    utils.fail(res, { message: 'Unable to update this project.' })
  }
}

UserProjectsController.deleteUserProject = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        id: req.body.id,
      },
    })
    if (result === 1) {
      utils.success(res, {
        message: 'Successfully deleted project.',
      })
    } else {
      utils.fail(res, { message: 'Unable to delete this project.' })
    }
  } catch (err) {
    utils.fail(res, err)
  }
}

export default UserProjectsController
