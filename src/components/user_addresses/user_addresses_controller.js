import db from '../../db_models';
import utils from '../../utils/utils';
import queryUtils from '../../utils/queryUtils';
import userAddressService from './user_addresses_service';

const model = db.UserAddress;

const getUserAddresses = async (req, res) => {
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
        user_id: parseInt(userId, 10),
      };
    }

    const data = await model.findAndCountAll(dbQuery);

    const pages = Math.ceil(data.count / limit);
    const formatted = data.rows.map(userAddressService.formatFromDb);
    utils.success(res, { content: formatted, count: data.count, pages, page });
  } catch (err) {
    utils.success(res, err);
  }
};

const addUserAddress = async (req, res) => {
  const formatted = userAddressService.formatForDb(req.body);

  try {
    const userAddress = await model.create(formatted);
    utils.success(res, userAddressService.formatFromDb(userAddress));
  } catch (err) {
    utils.fail(res, err);
  }
};

const updateUserAddress = async (req, res) => {
  const userAddress = req.body;

  try {
    await model.update(userAddressService.formatForDb(userAddress), {
      where: {
        id: userAddress.id,
      },
    });
    const _userAddress = await model.findOne({
      where: {
        id: req.body.id,
      },
    });
    utils.success(res, { content: userAddressService.formatFromDb(_userAddress) });
  } catch (err) {
    utils.fail(res, { message: 'Unable to update user address.' });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const result = await model.destroy({
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

export default {
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
