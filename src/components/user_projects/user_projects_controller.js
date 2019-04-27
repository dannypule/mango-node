import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import requestUtils from '../../utils/requestUtils';
import userProjectsService from './user_projects_service';

const model = db.UserProject;

const getUserProjects = async (req, res) => {
  try {
    const { userUuid, projectUuid, postCode } = req.query;

    const dbQuery = requestUtils.getDbQuery({
      req,
      where: {
        user_uuid: userUuid,
        project_uuid: projectUuid,
        post_code: postCode
      }
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = requestUtils.getResponseBody(req, data, userProjectsService.formatFromDb);
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
        uuid: userProject.uuid
      }
    });
    const updated = await model.findOne({
      where: {
        uuid: req.body.uuid
      }
    });
    responseUtils.success(res, userProjectsService.formatFromDb(updated));
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update this project.' });
  }
};

const deleteUserProject = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        uuid: req.body.uuid
      }
    });
    if (result === 1) {
      responseUtils.success(res, {
        message: 'Successfully deleted project.'
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
  deleteUserProject
};
