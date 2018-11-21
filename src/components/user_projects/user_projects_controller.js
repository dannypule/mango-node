import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';
import userProjectsService from './user_projects_service';

const model = db.UserProject;

const getUserProjects = async (req, res) => {
  try {
    const { userId, projectId, postCode } = req.query;

    const dbQuery = getRequestUtils.getDbQuery(req, {
      where: {
        user_id: parseInt(userId, 10),
        project_id: parseInt(projectId, 10),
        post_code: postCode,
      },
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = getRequestUtils.getResponseBody(req, data, userProjectsService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addUserProject = async (req, res) => {
  const formatted = userProjectsService.formatForDb(req.body);

  try {
    const userProject = await model.create(formatted);
    responseUtils.success(res, userProjectsService.formatFromDb(userProject));
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateUserProject = async (req, res) => {
  const userProject = req.body;

  try {
    await model.update(userProjectsService.formatForDb(userProject), {
      where: {
        id: userProject.id,
      },
    });
    const updated = await model.findOne({
      where: {
        id: req.body.id,
      },
    });
    responseUtils.success(res, { content: userProjectsService.formatFromDb(updated) });
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update this project.' });
  }
};

const deleteUserProject = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        id: req.body.id,
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
  getUserProjects,
  addUserProject,
  updateUserProject,
  deleteUserProject,
};
