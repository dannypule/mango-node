import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';
import userAddressService from './user_addresses_service';

const model = db.UserAddress;

const getUserAddresses = async (req, res) => {
  try {
    const { userUuid, postCode } = req.query;

    const dbQuery = getRequestUtils.getDbQuery(req, {
      where: {
        user_uuid: userUuid,
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
        uuid: userAddress.uuid,
      },
    });
    const _userAddress = await model.findOne({
      where: {
        uuid: req.body.uuid,
      },
    });
    responseUtils.success(res, userAddressService.formatFromDb(_userAddress));
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update user address.' });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        uuid: req.body.uuid,
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
