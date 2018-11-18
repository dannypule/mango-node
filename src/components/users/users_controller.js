import usersService from './users_service';
import db from '../../db_models';
import utils from '../../utils/utils';
import queryUtils from '../../utils/queryUtils';

const model = db.User;

const getUsers = async (req, res) => {
  try {
    const dbQuery = queryUtils.getDbQuery(req);
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = queryUtils.getResponseBody(req, data, usersService.formatFromDb);
    utils.success(res, responseBody);
  } catch (err) {
    utils.fail(res, err);
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

  usersService.updateUser(req, res, user.id, objectToUpdate);
};

const updateEmail = async (req, res) => {
  const user = req.body;

  const objectToUpdate = {
    email: user.email,
  };

  usersService.updateUser(req, res, user.id, objectToUpdate);
};

const updatePassword = async (req, res) => {
  const user = req.body;

  const password = await usersService.saltAndHashPassword(user.password);

  const objectToUpdate = {
    password,
  };

  usersService.updateUser(req, res, user.id, objectToUpdate);
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

  usersService.updateUser(req, res, user.id, objectToUpdate);
};

const changeUserStatus = async (req, res) => {
  const user = req.body;

  const objectToUpdate = {
    status: user.status,
  };

  usersService.updateUser(req, res, user.id, objectToUpdate);
};

const setStatusToDeleted = async (req, res) => {
  const user = req.body;

  const objectToUpdate = {
    status: 'DELETED',
  };

  usersService.updateUser(req, res, user.id, objectToUpdate);
};

const removeUser = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      utils.success(res);
    } else {
      utils.fail(res, { message: 'Unable to delete this user.' });
    }
  } catch (err) {
    utils.fail(res, err);
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
      utils.success(res, { result });
    } else {
      utils.fail(res, { message: 'Unable to delete this user.', result });
    }
  } catch (err) {
    utils.fail(res, err);
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
