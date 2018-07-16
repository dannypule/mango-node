import bcrypt from 'bcrypt';
import utils from '../../utils/utils';
import { validateUser } from '../../validation_models/user_validation';

export const formatFromDb = user => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    userRoleCode: user.user_role_code,
    status: user.status,
  };
};

export const formatUserForDb = user => {
  return {
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    password: user.password,
    user_role_code: user.userRoleCode,
    status: user.status,
  };
};

class UsersService {
  constructor(model) {
    this.model = model;
  }

  addUser = async (req, res, user) => {
    try {
      await validateUser(req, res, user);

      const formatted = formatUserForDb(user);

      const saltFactor = 13;

      const salt = await bcrypt.genSalt(saltFactor);
      const hash = await bcrypt.hash(formatted.password, salt, null);
      formatted.password = hash;
      const _user = await this.model.create(formatted, { individualHooks: true });
      utils.success(res, formatFromDb(_user));
    } catch (err) {
      utils.fail(res, err);
    }
  };
}

export default UsersService;
