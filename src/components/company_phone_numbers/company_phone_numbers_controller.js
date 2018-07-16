import { formatFromDb, formatForDb } from './company_phone_numbers_service';
import utils from '../../utils/utils';

export default class CompanyPhoneNumbersController {
  constructor({ model }) {
    this.model = model;
  }

  getCompanyPhoneNumbers = async (req, res) => {
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
      utils.success(res, { content: formatted, count: data.count, pages, page });
    } catch (err) {
      utils.success(res, err);
    }
  };

  addCompanyPhoneNumber = async (req, res) => {
    const formatted = formatForDb(req.body);

    try {
      const companyPhoneNumber = await this.model.create(formatted);
      utils.success(res, formatFromDb(companyPhoneNumber));
    } catch (err) {
      utils.fail(res, err);
    }
  };

  updateCompanyPhoneNumber = async (req, res) => {
    const companyPhoneNumber = req.body;

    try {
      await this.model.update(formatForDb(companyPhoneNumber), {
        where: {
          id: companyPhoneNumber.id,
        },
      });
      const _companyPhoneNumber = await this.model.findOne({
        where: {
          id: req.body.id,
        },
      });
      utils.success(res, { content: formatFromDb(_companyPhoneNumber) });
    } catch (err) {
      utils.fail(res, { message: 'Unable to update phone number.' });
    }
  };

  deleteCompanyPhoneNumber = async (req, res) => {
    try {
      const result = await this.model.destroy({
        where: {
          id: req.body.id,
        },
      });
      if (result === 1) {
        utils.success(res, {
          message: 'Successfully deleted phone number.',
        });
      } else {
        utils.fail(res, { message: 'Unable to delete phone number.' });
      }
    } catch (err) {
      utils.fail(res, err);
    }
  };
}
