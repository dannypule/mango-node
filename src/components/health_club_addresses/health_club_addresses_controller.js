import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import requestUtils from '../../utils/requestUtils';
import healthClubAddressesService from './health_club_addresses_service';

const model = db.HealthClubAddress;

const getHealthClubAddresses = async (req, res) => {
  try {
    const { healthClubUuid, postCode } = req.query;

    const dbQuery = requestUtils.getDbQuery({
      req,
      where: {
        healthClub_uuid: healthClubUuid,
        post_code: postCode
      }
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = requestUtils.getResponseBody(req, data, healthClubAddressesService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addHealthClubAddress = async (req, res) => {
  const formatted = healthClubAddressesService.formatForDb(req.body);

  try {
    const healthClubAddress = await model.create(formatted);
    responseUtils.success(res, healthClubAddressesService.formatFromDb(healthClubAddress));
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateHealthClubAddress = async (req, res) => {
  const healthClubAddress = req.body;

  try {
    await model.update(healthClubAddressesService.formatForDb(healthClubAddress), {
      where: {
        uuid: healthClubAddress.uuid
      }
    });
    const _healthClubAddress = await model.findOne({
      where: {
        uuid: req.body.uuid
      }
    });
    responseUtils.success(res, healthClubAddressesService.formatFromDb(_healthClubAddress));
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update address.' });
  }
};

const deleteHealthClubAddress = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        uuid: req.body.uuid
      }
    });
    if (result === 1) {
      responseUtils.success(res, {
        message: 'Successfully delete address.'
      });
    } else {
      responseUtils.fail(res, { message: 'Unable to delete address.' });
    }
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

export default {
  getHealthClubAddresses,
  addHealthClubAddress,
  updateHealthClubAddress,
  deleteHealthClubAddress
};
