import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';
import healthClubsService from './health_clubs_service';

const model = db.HealthClub;

const getHealthClubs = async (req, res) => {
  try {
    const dbQuery = getRequestUtils.getDbQuery(req);
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = getRequestUtils.getResponseBody(req, data, healthClubsService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addHealthClub = async (req, res) => {
  const formatted = healthClubsService.formatForDb(req.body);

  try {
    const healthClub = await model.create(formatted);
    responseUtils.success(res, healthClubsService.formatFromDb(healthClub));
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateHealthClub = async (req, res) => {
  const healthClub = req.body;

  try {
    await model.update(healthClubsService.formatForDb(healthClub), {
      where: {
        uuid: healthClub.uuid
      }
    });
    const _healthClub = await model.findOne({
      where: {
        uuid: req.body.uuid
      }
    });
    responseUtils.success(res, healthClubsService.formatFromDb(_healthClub));
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update this health club.' });
  }
};

const deleteHealthClub = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        uuid: req.body.uuid
      }
    });
    if (result === 1) {
      responseUtils.success(res, {
        message: 'Successfully deleted health club.'
      });
    } else {
      responseUtils.fail(res, { message: 'Unable to delete this health club.' });
    }
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

export default {
  getHealthClubs,
  addHealthClub,
  updateHealthClub,
  deleteHealthClub
};
