import bcrypt from 'bcrypt';
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

class UsersService {
  constructor({ model, utils }) {
    this.model = model;
    this.utils = utils;
  }

  addUser = async (req, res, user) => {
    try {
      await validateUser(req, res, user);

      const formatted = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        user_role_code: user.userRoleCode,
        status: user.status,
      };

      formatted.password = this.saltAndHashPassword(formatted.password);

      const _user = await this.model.create(formatted, { individualHooks: true });
      this.utils.success(res, formatFromDb(_user));
    } catch (err) {
      this.utils.fail(res, err);
    }
  };

  saltAndHashPassword = async (plainTextPassword) => {
    const saltFactor = 13;
    const salt = await bcrypt.genSalt(saltFactor);
    const hash = await bcrypt.hash(plainTextPassword, salt, null);
    return hash;
  }

  updateUser = async (req, res, userId, objectToUpdate) => {
    if (req.body.id !== req.user.id) { // todo - or if user is not manager of these users or if user is not admin
      return this.utils.fail(res, { message: 'Unable to update this user.' });
    }

    try {
      const result = await this.model.update(objectToUpdate, {
        where: {
          id: userId,
        },
      });
      if (result[0] !== 1) {
        this.utils.fail(res, { message: 'Unable to update this user.' });
      }
      const _user = await this.model.findOne({
        where: {
          id: req.body.id,
        },
      });
      this.utils.success(res, { content: formatFromDb(_user) });
    } catch (err) {
      this.utils.fail(res, { message: 'Unable to update this user.' });
    }
  };
}

export default UsersService;
