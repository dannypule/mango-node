import { formatFromDb, formatForDb } from './companies_service';

export default class CompaniesController {
  constructor({ model, modelUserCompany, utils }) {
    this.model = model;
    this.modelUserCompany = modelUserCompany;
    this.utils = utils;
  }

  getCompanies = async (req, res) => {
    try {
      const limit = 15; // number of records per page

      const { id } = req.query;

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

      const data = await this.model.findAndCountAll(dbQuery);

      const pages = Math.ceil(data.count / limit);
      const formatted = data.rows.map(formatFromDb);
      this.utils.success(res, { content: formatted, count: data.count, pages, page });
    } catch (err) {
      this.utils.success(res, err);
    }
  };

  addCompany = async (req, res) => {
    const formatted = formatForDb(req.body);
    const userId = req.user.id;

    try {
      const company = await this.model.create(formatted);
      await this.modelUserCompany.create({ user_id: userId, company_id: company.id });
      this.utils.success(res, { company: formatFromDb(company) });
    } catch (err) {
      this.utils.fail(res, err);
    }
  };

  updateCompany = async (req, res) => {
    const company = req.body;

    try {
      await this.model.update(formatForDb(company), {
        where: {
          id: company.id,
        },
      });
      const _company = await this.model.findOne({
        where: {
          id: req.body.id,
        },
      });
      this.utils.success(res, { content: formatFromDb(_company) });
    } catch (err) {
      this.utils.fail(res, { message: 'Unable to update this company.' });
    }
  };

  deleteCompany = async (req, res) => {
    try {
      const result = await this.model.destroy({
        where: {
          id: req.body.id,
        },
      });
      if (result === 1) {
        this.utils.success(res, {
          message: 'Successfully deleted company.',
        });
      } else {
        this.utils.fail(res, { message: 'Unable to delete this company.' });
      }
    } catch (err) {
      this.utils.fail(res, err);
    }
  };
}
