import { formatFromDb, formatForDb } from './company_addresses_service';
import utils from '../../utils';

export default class CompanyAddressesController {
  constructor(model) {
    this.model = model;
  }

  getCompanyAddresses = async (req, res) => {
    try {
      const limit = 15; // number of records per page

      const { id, companyId } = req.query;

      const page = parseInt(req.query.page, 10) || 1; // page 1 default

      const offset = limit * (page - 1); // define offset

      // default db query
      const dbQuery = {
        where: {},
        limit,
        offset,
        order: [['id', 'DESC']],
      };

      // ability to search by id
      if (id !== undefined) {
        dbQuery.where = {
          ...dbQuery.where,
          id: parseInt(id, 10),
        };
      }

      // ability to search by companyId
      if (companyId !== undefined) {
        dbQuery.where = {
          ...dbQuery.where,
          company_id: parseInt(companyId, 10),
        };
      }

      const data = await this.model.findAndCountAll(dbQuery);

      const pages = Math.ceil(data.count / limit);
      const formatted = data.rows.map(formatFromDb);
      utils.success(res, { companyAddresses: formatted, count: data.count, pages, page });
    } catch (err) {
      utils.success(res, err);
    }
  };

  addCompanyAddress = async (req, res) => {
    const formatted = formatForDb(req.body);

    try {
      const companyAddress = await this.model.create(formatted);
      utils.success(res, { companyAddress: formatFromDb(companyAddress) });
    } catch (err) {
      utils.fail(res, err);
    }
  };

  updateCompanyAddress = async (req, res) => {
    const companyAddress = req.body;

    try {
      await this.model.update(formatForDb(companyAddress), {
        where: {
          id: companyAddress.id,
        },
      });
      const _companyAddress = await this.model.findOne({
        where: {
          id: req.body.id,
        },
      });
      utils.success(res, { companyAddress: formatFromDb(_companyAddress) });
    } catch (err) {
      utils.fail(res, { message: 'Unable to update address.' });
    }
  };

  deleteCompanyAddress = async (req, res) => {
    try {
      const result = await this.model.destroy({
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
}
