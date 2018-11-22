import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';
import companyPhoneNumbersService from './company_phone_numbers_service';

const model = db.CompanyPhoneNumber;

const getCompanyPhoneNumbers = async (req, res) => {
  try {
    const { companyUuid, postCode } = req.query;

    const dbQuery = getRequestUtils.getDbQuery(req, {
      where: {
        company_uuid: companyUuid,
        post_code: postCode,
      },
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = getRequestUtils.getResponseBody(req, data, companyPhoneNumbersService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addCompanyPhoneNumber = async (req, res) => {
  const formatted = companyPhoneNumbersService.formatForDb(req.body);

  try {
    const companyPhoneNumber = await model.create(formatted);
    responseUtils.success(res, companyPhoneNumbersService.formatFromDb(companyPhoneNumber));
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateCompanyPhoneNumber = async (req, res) => {
  const companyPhoneNumber = req.body;

  try {
    await model.update(companyPhoneNumbersService.formatForDb(companyPhoneNumber), {
      where: {
        uuid: companyPhoneNumber.uuid,
      },
    });
    const _companyPhoneNumber = await model.findOne({
      where: {
        uuid: req.body.uuid,
      },
    });
    responseUtils.success(res, { content: companyPhoneNumbersService.formatFromDb(_companyPhoneNumber) });
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update phone number.' });
  }
};

const deleteCompanyPhoneNumber = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        uuid: req.body.uuid,
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
  getCompanyPhoneNumbers,
  addCompanyPhoneNumber,
  updateCompanyPhoneNumber,
  deleteCompanyPhoneNumber,
};
