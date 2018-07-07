import bcrypt from 'bcrypt';
import utils from '../../utils';
import { addUser } from '../users/users_service';

export default class AuthController {
  constructor(model) {
    this.model = model;
  }

  login = async (req, res) => {
    try {
      const user = await this.model.findOne({
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
          utils.success(res, { token: user.getJWT(user) });
        } else {
          utils.fail(res, { message: `Couldn't log in.` }, 403);
        }
      });
    } catch (err) {
      utils.fail(res, err);
    }
  };

  register = (req, res) => {
    const user = req.body;

    addUser(req, res, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      companyId: 1, // todo - make dynamic
      userRoleCode: 30, // basic user
    });
  };
}
