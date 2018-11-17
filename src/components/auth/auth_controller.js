import bcrypt from 'bcrypt';
import { getJWT } from '../../utils/jwt';
import usersService from '../users/users_service';
import utils from '../../utils/utils';
import db from '../../db_models';

const model = db.User;

const login = async (req, res) => {
  try {
    const user = await model.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) utils.fail(res, { message: `Couldn't log in.` });

    bcrypt.compare(req.body.password, user.password, (err, r) => {
      if (err) {
        utils.fail(res, err);
        return;
      }
      if (r) {
        utils.success(res, { token: getJWT(user) });
      } else {
        utils.fail(res, { message: `Couldn't log in.` }, 403);
      }
    });
  } catch (err) {
    utils.fail(res, err);
  }
};

const register = (req, res) => {
  const user = req.body;

  usersService.addUser(req, res, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    companyId: user.companyId,
    userRoleCode: 30, // todo basic user - should use constants file
    status: 'ACTIVE',
  }, true);
};

export default {
  login,
  register,
};
