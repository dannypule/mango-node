import { formatFromDb, formatForDb } from './user_addresses_service';
import utils from '../../utils';

export default class UserAddressesController {
  constructor(model) {
    this.model = model;
  }

  getUserAddresses = async (req, res) => {
    try {
      const limit = 15; // number of records per page

      const { id, userId } = req.query;

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

      // ability to search by userId
      if (userId !== undefined) {
        dbQuery.where = {
          ...dbQuery.where,
          company_id: parseInt(userId, 10),
        };
      }

      const data = await this.model.findAndCountAll(dbQuery);

      const pages = Math.ceil(data.count / limit);
      const formatted = data.rows.map(formatFromDb);
      utils.success(res, { userAddresses: formatted, count: data.count, pages, page });
    } catch (err) {
      utils.success(res, err);
    }
  };

  addUserAddress = async (req, res) => {
    const formatted = formatForDb(req.body);

    try {
      const userAddress = await this.model.create(formatted);
      utils.success(res, { userAddress: formatFromDb(userAddress) });
    } catch (err) {
      utils.fail(res, err);
    }
  };

  updateUserAddress = async (req, res) => {
    const userAddress = req.body;

    try {
      await this.model.update(formatForDb(userAddress), {
        where: {
          id: userAddress.id,
        },
      });
      const _userAddress = await this.model.findOne({
        where: {
          id: req.body.id,
        },
      });
      utils.success(res, { userAddress: formatFromDb(_userAddress) });
    } catch (err) {
      utils.fail(res, { message: 'Unable to update user address.' });
    }
  };

  deleteUserAddress = async (req, res) => {
    try {
      const result = await this.model.destroy({
        where: {
          id: req.body.id,
        },
      });
      if (result === 1) {
        utils.success(res, {
          message: 'Successfully deleted user address.',
        });
      } else {
        utils.fail(res, { message: 'Unable to delete user address.' });
      }
    } catch (err) {
      utils.fail(res, err);
    }
  };
}
