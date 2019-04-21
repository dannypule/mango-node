import bcrypt from 'bcrypt';
import { validateUser } from '../../form_validation/user';
import { getJWT } from '../../utils/jwt';
import responseUtils from '../../utils/responseUtils';
import db from '../../db_models';

const model = db.User;

const formatFromDb = user => {
  return {
    uuid: user.uuid,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    userRoleCode: user.user_role_code,
    verfied: user.verfied,
    status: user.status,
  };
};

const saltAndHashPassword = async plainTextPassword => {
  const saltFactor = 13;
  const salt = await bcrypt.genSalt(saltFactor);
  const hash = await bcrypt.hash(plainTextPassword, salt, null);
  return hash;
};

const addUser = async (req, res, user, sendToken) => {
  try {
    await validateUser(req, res, user);

    const formatted = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      user_role_code: user.userRoleCode,
      company_uuid: user.companyUuid,
      status: user.status
    };

    formatted.password = await saltAndHashPassword(formatted.password);

    const _user = await model.create(formatted, { individualHooks: true });
    const token = sendToken ? getJWT(_user) : '';

    responseUtils.success(res, { user: formatFromDb(_user), token });
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const isPermitted = (req, allowedUsers) => {
  if (allowedUsers.includes('OWNER')) {
    if (req.body.uuid === req.user.uuid) {
      return true;
    }
  }
  if (allowedUsers.includes('ADMIN')) {
    if (req.user.userRoleCode >= 100) {
      return true;
    }
  }
  return false;
};

const updateUser = async (req, res, userUuid, objectToUpdate) => {
  try {
    const result = await model.update(objectToUpdate, {
      where: {
        uuid: userUuid,
      },
    });
    if (result[0] !== 1) {
      responseUtils.fail(res, { message: 'Unable to update this user.' });
    }
    const _user = await model.findOne({
      where: {
        uuid: req.body.uuid,
      },
    });
    responseUtils.success(res, { content: formatFromDb(_user) });
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update this user.' });
  }
};

export default {
  formatFromDb,
  saltAndHashPassword,
  addUser,
  isPermitted,
  updateUser,
};
