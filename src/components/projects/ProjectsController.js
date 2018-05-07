// import express from 'express'
import db from '../../db-models'
import { formatGetProjectsItemResponse } from './ProjectsService'
import utils from '../../utils'

const ProjectsController = {}

ProjectsController.getProjects = async (req, res) => {
  try {
    const Projects = await db.Projects.findAll()
    const formatted = Projects.map(formatGetProjectsItemResponse)
    utils.success(res, formatted)
  } catch (err) {
    utils.fail(res, err)
  }
}

ProjectsController.getProjectsByCompanyId = async (req, res) => {
  try {
    const Projects = await db.Projects.findAll({
      where: {
        company_id: req.body.id,
      },
    })
    const formatted = Projects.map(formatGetProjectsItemResponse)
    utils.success(res, formatted)
  } catch (err) {
    utils.fail(res, err)
  }
}

export default ProjectsController
