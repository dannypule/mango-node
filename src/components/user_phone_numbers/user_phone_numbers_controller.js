import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import requestUtils from '../../utils/requestUtils';
import userPhoneNumbersService from './user_phone_numbers_service';

const model = db.UserPhoneNumber;

const getUserPhoneNumbers = async (req, res) => {
  try {
    const { userUuid, postCode } = req.query;

    const dbQuery = requestUtils.getDbQuery({
      req,
      where: {
        user_uuid: userUuid,
        post_code: postCode
      }
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = requestUtils.getResponseBody(req, data, userPhoneNumbersService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addUserPhoneNumber = async (req, res) => {
  const formatted = userPhoneNumbersService.formatForDb(req.body);

  try {
    const userPhoneNumber = await model.create(formatted);
    responseUtils.success(res, userPhoneNumbersService.formatFromDb(userPhoneNumber));
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateUserPhoneNumber = async (req, res) => {
  const userPhoneNumber = req.body;

  try {
    await model.update(userPhoneNumbersService.formatForDb(userPhoneNumber), {
      where: {
        uuid: userPhoneNumber.uuid
      }
    });
    const _userPhoneNumber = await model.findOne({
      where: {
        uuid: req.body.uuid
      }
    });
    responseUtils.success(res, userPhoneNumbersService.formatFromDb(_userPhoneNumber));
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update phone number.' });
  }
};

const deleteUserPhoneNumber = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        uuid: req.body.uuid
      }
    });
    if (result === 1) {
      responseUtils.success(res, {
        message: 'Successfully deleted phone number.'
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
  deleteUserPhoneNumber
};
