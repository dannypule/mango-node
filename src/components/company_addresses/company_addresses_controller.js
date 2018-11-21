import db from '../../db_models';
import responseUtils from '../../utils/responseUtils';
import getRequestUtils from '../../utils/getRequestUtils';
import companyAddressesService from './company_addresses_service';

const model = db.CompanyAddress;

const getCompanyAddresses = async (req, res) => {
  try {
    const { companyId, postCode } = req.query;

    const dbQuery = getRequestUtils.getDbQuery(req, {
      where: {
        company_id: parseInt(companyId, 10),
        post_code: postCode,
      },
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = getRequestUtils.getResponseBody(req, data, companyAddressesService.formatFromDb);
    responseUtils.success(res, responseBody);
  } catch (err) {
    responseUtils.success(res, err);
  }
};

const addCompanyAddress = async (req, res) => {
  const formatted = companyAddressesService.formatForDb(req.body);

  try {
    const companyAddress = await model.create(formatted);
    responseUtils.success(res, companyAddressesService.formatFromDb(companyAddress));
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

const updateCompanyAddress = async (req, res) => {
  const companyAddress = req.body;

  try {
    await model.update(companyAddressesService.formatForDb(companyAddress), {
      where: {
        id: companyAddress.id,
      },
    });
    const _companyAddress = await model.findOne({
      where: {
        id: req.body.id,
      },
    });
    responseUtils.success(res, { content: companyAddressesService.formatFromDb(_companyAddress) });
  } catch (err) {
    responseUtils.fail(res, { message: 'Unable to update address.' });
  }
};

const deleteCompanyAddress = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      responseUtils.success(res, {
        message: 'Successfully delete address.',
      });
    } else {
      responseUtils.fail(res, { message: 'Unable to delete address.' });
    }
  } catch (err) {
    responseUtils.fail(res, err);
  }
};

export default {
  getCompanyAddresses,
  addCompanyAddress,
  updateCompanyAddress,
  deleteCompanyAddress,
};
