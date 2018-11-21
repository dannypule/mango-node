import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';
import userAddressService from './user_addresses_service';

const model = db.UserAddress;

const getUserAddresses = async (req, res) => {
  try {
    const { userId, postCode } = req.query;

    const dbQuery = getRequestUtils.getDbQuery(req, {
      where: {
        user_id: parseInt(userId, 10),
        post_code: postCode,
      },
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = getRequestUtils.getResponseBody(req, data, userAddressService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addUserAddress = async (req, res) => {
  const formatted = userAddressService.formatForDb(req.body);

  try {
    const userAddress = await model.create(formatted);
    responseUtils.success(res, userAddressService.formatFromDb(userAddress));
  } catch (err) {
    responseUtils.fail(res, err);
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
    responseUtils.success(res, { content: userAddressService.formatFromDb(_userAddress) });
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update user address.' });
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
      responseUtils.success(res, {
        message: 'Successfully deleted user address.',
      });
    } else {
      responseUtils.fail(res, { message: 'Unable to delete user address.' });
    }
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

export default {
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
