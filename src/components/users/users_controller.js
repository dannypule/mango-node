import usersService from './users_service';
import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';

const model = db.User;

const getUsers = async (req, res) => {
  try {
    const dbQuery = getRequestUtils.getDbQuery(req);
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = getRequestUtils.getResponseBody(req, data, usersService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const addUser = (req, res) => {
  const user = req.body;

  usersService.addUser(req, res, user, false);
};

const updateName = async (req, res) => {
  const user = req.body;

  const objectToUpdate = {
    first_name: user.firstName,
    last_name: user.lastName,
  };

  usersService.updateUser(req, res, user.uuid, objectToUpdate);
};

const updateEmail = async (req, res) => {
  const user = req.body;

  const objectToUpdate = {
    email: user.email,
  };

  usersService.updateUser(req, res, user.uuid, objectToUpdate);
};

const updatePassword = async (req, res) => {
  const user = req.body;

  const password = await usersService.saltAndHashPassword(user.password);

  const objectToUpdate = {
    password,
  };

  usersService.updateUser(req, res, user.uuid, objectToUpdate);
};

const updateWholeUser = async (req, res) => {
  const user = req.body;
  const objectToUpdate = {
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    user_role_code: user.userRoleCode,
    status: user.status,
  };

  usersService.updateUser(req, res, user.uuid, objectToUpdate);
};

const changeUserStatus = async (req, res) => {
  const user = req.body;

  const objectToUpdate = {
    status: user.status,
  };

  usersService.updateUser(req, res, user.uuid, objectToUpdate);
};

const setStatusToDeleted = async (req, res) => {
  const user = req.body;

  const objectToUpdate = {
    status: 'DELETED',
  };

  usersService.updateUser(req, res, user.uuid, objectToUpdate);
};

const removeUser = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        uuid: req.body.uuid,
      },
    });
    if (result === 1) {
      responseUtils.success(res);
    } else {
      responseUtils.fail(res, { message: 'Unable to delete this user.' });
    }
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const removeUserByEmail = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        email: req.body.email,
      },
    });
    if (result === 1) {
      responseUtils.success(res, { result });
    } else {
      responseUtils.fail(res, { message: 'Unable to delete this user.', result });
    }
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

export default {
  getUsers,
  addUser,
  updateName,
  updateEmail,
  updatePassword,
  updateWholeUser,
  changeUserStatus,
  setStatusToDeleted,
  removeUser,
  removeUserByEmail,
};
