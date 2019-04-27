import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';
import companiesService from './companies_service';

const model = db.Company;

const getCompanies = async (req, res) => {
  try {
    const dbQuery = getRequestUtils.getDbQuery(req);
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = getRequestUtils.getResponseBody(req, data, companiesService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addCompany = async (req, res) => {
  const formatted = companiesService.formatForDb(req.body);
  // const userUuid = req.user.uuid;

  try {
    const company = await model.create(formatted);
    responseUtils.success(res, companiesService.formatFromDb(company));
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateCompany = async (req, res) => {
  const company = req.body;

  try {
    await model.update(companiesService.formatForDb(company), {
      where: {
        uuid: company.uuid
      }
    });
    const _company = await model.findOne({
      where: {
        uuid: req.body.uuid
      }
    });
    responseUtils.success(res, companiesService.formatFromDb(_company));
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update this company.' });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        uuid: req.body.uuid
      }
    });
    if (result === 1) {
      responseUtils.success(res, {
        message: 'Successfully deleted company.'
      });
    } else {
      responseUtils.fail(res, { message: 'Unable to delete this company.' });
    }
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

export default {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany
};
