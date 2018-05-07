import db from '../../db-models'
import { formatDbResponse, formatForDb } from './ProjectsService'
import utils from '../../utils'

const ProjectsController = {}

ProjectsController.getProjects = async (req, res) => {
  try {
    const projects = await db.Project.findAll()
    const formatted = projects.map(formatDbResponse)
    utils.success(res, formatted)
  } catch (err) {
    utils.success(res, err)
  }
}

ProjectsController.getProjectsByCompanyId = async (req, res) => {
  try {
    const Projects = await db.Project.findAll({
      where: {
        company_id: parseInt(req.params.companyId, 10),
      },
    })
    const formatted = Projects.map(formatDbResponse)
    utils.success(res, formatted)
  } catch (err) {
    utils.fail(res, err)
  }
}

ProjectsController.addProject = async (req, res) => {
  const formatted = formatForDb(req.body)

  try {
    const project = await db.Project.create(formatted)
    utils.success(res, project)
  } catch (err) {
    utils.fail(res, err)
  }
}

ProjectsController.updateProject = async (req, res) => {
  const project = req.body

  const formattedForDb = formatForDb(project)

  try {
    await db.Project.update(formattedForDb, {
      where: {
        id: project.id,
      },
    })
    const updated = await db.Project.findOne({
      where: {
        id: req.body.id,
      },
    })
    utils.success(res, formatDbResponse(updated))
  } catch (err) {
    utils.fail(res, { message: 'Unable to update this project.' })
  }
}

ProjectsController.deleteProject = async (req, res) => {
  try {
    const result = await db.Project.destroy({
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
