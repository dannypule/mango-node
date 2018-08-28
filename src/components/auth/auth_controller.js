import bcrypt from 'bcrypt';
import { getJWT } from '../../utils/jwt';

export default class AuthController {
  constructor({ model, usersService, utils }) {
    this.model = model;
    this.usersService = usersService;
    this.utils = utils;
  }

  login = async (req, res) => {
    try {
      const user = await this.model.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) this.utils.fail(res, { message: `Couldn't log in.` });

      bcrypt.compare(req.body.password, user.password, (err, r) => {
        if (err) {
          this.utils.fail(res, err);
          return;
        }
        if (r) {
          this.utils.success(res, { token: getJWT(user) });
        } else {
          this.utils.fail(res, { message: `Couldn't log in.` }, 403);
        }
      });
    } catch (err) {
      this.utils.fail(res, err);
    }
  };

  register = (req, res) => {
    const user = req.body;

    this.usersService.addUser(req, res, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      companyId: user.companyId,
      userRoleCode: 30, // todo basic user - should use constants file
      status: 'ACTIVE',
    }, true);
  };
}
