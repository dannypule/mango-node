import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import requestUtils from '../../utils/requestUtils';
import healthClubPhoneNumbersService from './health_club_phone_numbers_service';

const model = db.HealthClubPhoneNumber;

const getHealthClubPhoneNumbers = async (req, res) => {
  try {
    const { healthClubUuid, postCode } = req.query;

    const dbQuery = requestUtils.getDbQuery({
      req,
      where: {
        health_club_uuid: healthClubUuid,
        post_code: postCode
      }
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = requestUtils.getResponseBody(req, data, healthClubPhoneNumbersService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addHealthClubPhoneNumber = async (req, res) => {
  const formatted = healthClubPhoneNumbersService.formatForDb(req.body);

  try {
    const HealthClubPhoneNumber = await model.create(formatted);
    responseUtils.success(res, healthClubPhoneNumbersService.formatFromDb(HealthClubPhoneNumber));
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateHealthClubPhoneNumber = async (req, res) => {
  const HealthClubPhoneNumber = req.body;

  try {
    await model.update(healthClubPhoneNumbersService.formatForDb(HealthClubPhoneNumber), {
      where: {
        uuid: HealthClubPhoneNumber.uuid
      }
    });
    const _healthClubPhoneNumber = await model.findOne({
      where: {
        uuid: req.body.uuid
      }
    });
    responseUtils.success(res, healthClubPhoneNumbersService.formatFromDb(_healthClubPhoneNumber));
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update phone number.' });
  }
};

const deleteHealthClubPhoneNumber = async (req, res) => {
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
  getHealthClubPhoneNumbers,
  addHealthClubPhoneNumber,
  updateHealthClubPhoneNumber,
  deleteHealthClubPhoneNumber
};
