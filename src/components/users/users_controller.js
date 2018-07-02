import { formatFromDb } from './users_service';

export default class UsersController {
  constructor(model, utils, usersService) {
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

  deleteUser = async (req, res) => {
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
