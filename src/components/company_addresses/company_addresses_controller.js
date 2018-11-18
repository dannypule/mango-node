import db from '../../db_models';
import utils from '../../utils/utils';
import queryUtils from '../../utils/queryUtils';
import companyAddressesService from './company_addresses_service';

const model = db.CompanyAddress;

const getCompanyAddresses = async (req, res) => {
  try {
    // const limit = 15; // number of records per page

    // const { id, companyId } = req.query;

    // const page = parseInt(req.query.page, 10) || 1; // page 1 default

    // const offset = limit * (page - 1); // define offset

    // // default db query
    // const dbQuery = {
    //   where: {},
    //   limit,
    //   offset,
    //   order: [['id', 'DESC']],
    // };

    // // ability to search by id
    // if (id !== undefined) {
    //   dbQuery.where = {
    //     ...dbQuery.where,
    //     id: parseInt(id, 10),
    //   };
    // }

    // // ability to search by companyId
    // if (companyId !== undefined) {
    //   dbQuery.where = {
    //     ...dbQuery.where,
    //     company_id: parseInt(companyId, 10),
    //   };
    // }

    // const data = await model.findAndCountAll(dbQuery);

    // const pages = Math.ceil(data.count / limit);
    // const formatted = data.rows.map(companyAddressesService.formatFromDb);
    // utils.success(res, { content: formatted, count: data.count, pages, page });

    const { companyId, postCode } = req.query;

    const dbQuery = queryUtils.getDbQuery(req, {
      where: {
        company_id: parseInt(companyId, 10),
        post_code: postCode,
      },
    });
    const data = await model.findAndCountAll(dbQuery);
    const responseBody = queryUtils.getResponseBody(req, data, companyAddressesService.formatFromDb);
    utils.success(res, responseBody);
  } catch (err) {
    utils.success(res, err);
  }
};

const addCompanyAddress = async (req, res) => {
  const formatted = companyAddressesService.formatForDb(req.body);

  try {
    const companyAddress = await model.create(formatted);
    utils.success(res, companyAddressesService.formatFromDb(companyAddress));
  } catch (err) {
    utils.fail(res, err);
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
    utils.success(res, { content: companyAddressesService.formatFromDb(_companyAddress) });
  } catch (err) {
    utils.fail(res, { message: 'Unable to update address.' });
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
      utils.success(res, {
        message: 'Successfully delete address.',
      });
    } else {
      utils.fail(res, { message: 'Unable to delete address.' });
    }
  } catch (err) {
    utils.fail(res, err);
  }
};

export default {
  getCompanyAddresses,
  addCompanyAddress,
  updateCompanyAddress,
  deleteCompanyAddress,
};
