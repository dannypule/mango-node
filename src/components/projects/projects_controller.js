import db from '../../db_models'
import { formatFromDb, formatForDb } from './projects_service'
import utils from '../../utils'

const ProjectsController = {}
const model = db.Project

ProjectsController.getProjects = async (req, res) => {
  try {
    const limit = 15 // number of records per page

    const {
      id = undefined, // undefined by default
      companyId = undefined, // undefined by default
      projectOwner = undefined, // undefined by default
    } = req.query

    const page = parseInt(req.query.page, 10) || 1 // page 1 default

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

    // ability to search by companyId
    if (companyId) {
      dbQuery.where = {
        ...dbQuery.where,
        company_id: parseInt(companyId, 10),
      }
    }

    // ability to search by projectOwner
    if (projectOwner) {
      dbQuery.where = {
        ...dbQuery.where,
        project_owner: parseInt(projectOwner, 10),
      }
    }

    const projects = await model.findAndCountAll(dbQuery)

    const pages = Math.ceil(projects.count / limit)
    const formatted = projects.rows.map(formatFromDb)
    utils.success(res, { projects: formatted, count: projects.count, pages, page })
  } catch (err) {
    utils.success(res, err)
  }
}

ProjectsController.addProject = async (req, res) => {
  const formatted = formatForDb(req.body)

  try {
    const project = await model.create(formatted)
    utils.success(res, project)
  } catch (err) {
    utils.fail(res, err)
  }
}

ProjectsController.updateProject = async (req, res) => {
  const project = req.body

  const formattedForDb = formatForDb(project)

  try {
    await model.update(formattedForDb, {
      where: {
        id: project.id,
      },
    })
    const updated = await model.findOne({
      where: {
        id: req.body.id,
      },
    })
    utils.success(res, formatFromDb(updated))
  } catch (err) {
    utils.fail(res, { message: 'Unable to update this project.' })
  }
}

ProjectsController.deleteProject = async (req, res) => {
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

export default ProjectsController
