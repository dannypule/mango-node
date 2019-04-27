import bcrypt from 'bcrypt';
import { getJWT } from '../../utils/jwt';
import usersService from '../users/users_service';
import responseUtils from '../../utils/responseUtils';
import db from '../../db_models';

const model = db.User;

const login = async (req, res) => {
  try {
    const user = await model.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) responseUtils.fail(res, { message: `Couldn't log in.` });

    bcrypt.compare(req.body.password, user.password, (err, r) => {
      if (err) {
        responseUtils.fail(res, err);
        return;
      }
      if (r) {
        responseUtils.success(res, { token: getJWT(user) });
      } else {
        responseUtils.fail(res, { message: `Couldn't log in.` }, 403);
      }
    });
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const register = (req, res) => {
  const user = req.body;
  usersService.addUser(
    req,
    res,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      companyUuid: user.companyUuid,
      userRoleCode: 30, // todo basic user - should use constants file
      status: 'ACTIVE'
    },
    true
  );
};

export default {
  login,
  register
};
