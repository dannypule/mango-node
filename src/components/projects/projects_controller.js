import db from '../../db_models';
import projectsService from './projects_service';
import utils from '../../utils/utils';

const model = db.Project;

const getProjects = async (req, res) => {
  try {
    const limit = 15; // number of records per page

    const { id, companyId, projectCreatorId } = req.query;

    const page = parseInt(req.query.page, 10) || 1; // page 1 default

    const offset = limit * (page - 1); // define offset

    // default db query
    const dbQuery = {
      where: {},
      limit,
      offset,
      order: [['id', 'DESC']],
    };

    // ability to search by id
    if (id !== undefined) {
      dbQuery.where = {
        ...dbQuery.where,
        id: parseInt(id, 10),
      };
    }

    // ability to search by companyId
    if (companyId !== undefined) {
      dbQuery.where = {
        ...dbQuery.where,
        company_id: parseInt(companyId, 10),
      };
    }

    // ability to search by projectCreatorId
    if (projectCreatorId !== undefined) {
      dbQuery.where = {
        ...dbQuery.where,
        project_creator_id: parseInt(projectCreatorId, 10),
      };
    }

    const projects = await model.findAndCountAll(dbQuery);

    const pages = Math.ceil(projects.count / limit);
    const formatted = projects.rows.map(projectsService.formatFromDb);
    utils.success(res, { content: formatted, count: projects.count, pages, page });
  } catch (err) {
    utils.success(res, err);
  }
};

const addProject = async (req, res) => {
  const formatted = projectsService.formatForDb(req.body);

  try {
    const project = await model.create(formatted);
    utils.success(res, projectsService.formatFromDb(project));
  } catch (err) {
    utils.fail(res, err);
  }
};

const updateProject = async (req, res) => {
  const project = req.body;

  try {
    await model.update(projectsService.formatForDb(project), {
      where: {
        id: project.id,
      },
    });
    const updated = await model.findOne({
      where: {
        id: req.body.id,
      },
    });
    utils.success(res, { project: projectsService.formatFromDb(updated) });
  } catch (err) {
    utils.fail(res, { message: 'Unable to update this project.' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      utils.success(res, {
        message: 'Successfully deleted project.',
      });
    } else {
      utils.fail(res, { message: 'Unable to delete this project.' });
    }
  } catch (err) {
    utils.fail(res, err);
  }
};

export default {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
};
