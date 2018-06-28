import { formatFromDb, addUser } from './users_service';
import utils from '../../utils';

export default class UserController {
  constructor(model) {
    this.model = model;
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
      utils.success(res, { users: formatted, count: data.count, pages, page, length: formatted.length });
    } catch (err) {
      utils.success(res, err);
    }
  };

  addUser = (req, res) => {
    const user = req.body;

    addUser(req, res, user);
  };

  deleteUser = async (req, res) => {
    try {
      const result = await this.model.destroy({
        where: {
          email: req.body.email,
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
}
