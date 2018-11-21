import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';
import userPhoneNumbersService from './user_phone_numbers_service';

const model = db.UserPhoneNumber;

const getUserPhoneNumbers = async (req, res) => {
  try {
    const { userId, postCode } = req.query;

    const dbQuery = getRequestUtils.getDbQuery(req, {
      where: {
        user_id: parseInt(userId, 10),
        post_code: postCode,
      },
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = getRequestUtils.getResponseBody(req, data, userPhoneNumbersService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addUserPhoneNumber = async (req, res) => {
  const formatted = userPhoneNumbersService.formatForDb(req.body);

  try {
    const userPhoneNumber = await model.create(formatted);
    responseUtils.success(res, { content: userPhoneNumbersService.formatFromDb(userPhoneNumber) });
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateUserPhoneNumber = async (req, res) => {
  const userPhoneNumber = req.body;

  try {
    await model.update(userPhoneNumbersService.formatForDb(userPhoneNumber), {
      where: {
        id: userPhoneNumber.id,
      },
    });
    const _userPhoneNumber = await model.findOne({
      where: {
        id: req.body.id,
      },
    });
    responseUtils.success(res, { content: userPhoneNumbersService.formatFromDb(_userPhoneNumber) });
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update phone number.' });
  }
};

const deleteUserPhoneNumber = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      responseUtils.success(res, {
        message: 'Successfully deleted phone number.',
      });
    } else {
      responseUtils.fail(res, { message: 'Unable to delete phone number.' });
    }
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

export default {
  getUserPhoneNumbers,
  addUserPhoneNumber,
  updateUserPhoneNumber,
  deleteUserPhoneNumber,
};
