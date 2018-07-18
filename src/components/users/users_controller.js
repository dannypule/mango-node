import { formatFromDb } from './users_service';

export default class UsersController {
  constructor({ model, utils, usersService }) {
    this.model = model;
    this.utils = utils;
    this.usersService = usersService;
  }

  getUsers = async (req, res) => {
    try {
      const limit = 15; // number of records per page

      const { id } = req.query;

      const page = parseInt(req.query.page, 10) || 1; // page 1 default

      const offset = limit * (page - 1); // define offset

      // default db query
      const dbQuery = {
        where: {},
        limit,
        offset,
        order: [['id', 'DESC']],
      };

      // ability to search by id
      if (id !== undefined) {
        dbQuery.where = {
          ...dbQuery.where,
          id: parseInt(id, 10),
        };
      }

      const data = await this.model.findAndCountAll(dbQuery);

      const pages = Math.ceil(data.count / limit);
      const formatted = data.rows.map(formatFromDb);
      this.utils.success(res, { content: formatted, count: data.count, pages, page, length: formatted.length });
    } catch (err) {
      this.utils.fail(res, err);
    }
  };

  addUser = (req, res) => {
    const user = req.body;

    this.usersService.addUser(req, res, user);
  };

  updateName = async (req, res) => {
    if (!this.usersService.isPermitted(req, ['OWNER', 'ADMIN'])) {
      return this.utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
    }

    const user = req.body;

    const objectToUpdate = {
      first_name: user.firstName,
      last_name: user.lastName,
    };

    this.usersService.updateUser(req, res, user.id, objectToUpdate);
  };

  updateEmail = async (req, res) => {
    if (!this.usersService.isPermitted(req, ['OWNER', 'ADMIN'])) {
      return this.utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
    }

    const user = req.body;

    const objectToUpdate = {
      email: user.email,
    };

    this.usersService.updateUser(req, res, user.id, objectToUpdate);
  };

  updatePassword = async (req, res) => {
    if (!this.usersService.isPermitted(req, ['OWNER', 'ADMIN'])) {
      return this.utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
    }

    const user = req.body;

    const saltAndHashPassword = await this.usersService.saltAndHashPassword(user.password);

    const objectToUpdate = {
      password: saltAndHashPassword,
    };

    this.usersService.updateUser(req, res, user.id, objectToUpdate);
  };

  updateWholeUser = async (req, res) => {
    if (!this.usersService.isPermitted(req, ['ADMIN'])) {
      return this.utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
    }

    const user = req.body;
    const objectToUpdate = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      user_role_code: user.userRoleCode,
      status: user.status,
    };

    this.usersService.updateUser(req, res, user.id, objectToUpdate);
  };

  deleteUser = async (req, res) => {
    if (!this.usersService.isPermitted(req, ['OWNER', 'ADMIN'])) {
      return this.utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
    }

    const user = req.body;

    const objectToUpdate = {
      status: 'DELETED',
    };

    this.usersService.updateUser(req, res, user.id, objectToUpdate);
  }

  removeUserFromDatabase = async (req, res) => {
    if (!this.isPermitted(req, ['ADMIN'])) {
      return this.utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
    }

    try {
      const result = await this.model.destroy({
        where: {
          email: req.body.email,
        },
      });
      if (result === 1) {
        this.utils.success(res);
      } else {
        this.utils.fail(res, { message: 'Unable to delete this user.' });
      }
    } catch (err) {
      this.utils.fail(res, err);
    }
  };
}
