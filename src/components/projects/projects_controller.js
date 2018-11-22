import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';
import projectsService from './projects_service';

const model = db.Project;

const getProjects = async (req, res) => {
  try {
    const { companyUuid, projectCreatorUuid, postCode } = req.query;

    const dbQuery = getRequestUtils.getDbQuery(req, {
      where: {
        company_uuid: companyUuid,
        project_creator_uuid: projectCreatorUuid,
        post_code: postCode,
      },
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = getRequestUtils.getResponseBody(req, data, projectsService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addProject = async (req, res) => {
  const formatted = projectsService.formatForDb(req.body);

  try {
    const project = await model.create(formatted);
    responseUtils.success(res, projectsService.formatFromDb(project));
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateProject = async (req, res) => {
  const project = req.body;

  try {
    await model.update(projectsService.formatForDb(project), {
      where: {
        uuid: project.uuid,
      },
    });
    const updated = await model.findOne({
      where: {
        uuid: req.body.uuid,
      },
    });
    responseUtils.success(res, { project: projectsService.formatFromDb(updated) });
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update this project.' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        uuid: req.body.uuid,
      },
    });
    if (result === 1) {
      responseUtils.success(res, {
        message: 'Successfully deleted project.',
      });
    } else {
      responseUtils.fail(res, { message: 'Unable to delete this project.' });
    }
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

export default {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
};
