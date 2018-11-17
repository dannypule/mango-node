import db from '../../db_models';
import utils from '../../utils/utils';
import companiesService from './companies_service';

const model = db.Company;

const getCompanies = async (req, res) => {
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

    const data = await model.findAndCountAll(dbQuery);

    const pages = Math.ceil(data.count / limit);
    const formatted = data.rows.map(companiesService.formatFromDb);
    utils.success(res, { content: formatted, count: data.count, pages, page });
  } catch (err) {
    utils.success(res, err);
  }
};

const addCompany = async (req, res) => {
  const formatted = companiesService.formatForDb(req.body);
  // const userId = req.user.id;

  try {
    const company = await model.create(formatted);
    utils.success(res, { company: companiesService.formatFromDb(company) });
  } catch (err) {
    utils.fail(res, err);
  }
};

const updateCompany = async (req, res) => {
  const company = req.body;

  try {
    await model.update(companiesService.formatForDb(company), {
      where: {
        id: company.id,
      },
    });
    const _company = await model.findOne({
      where: {
        id: req.body.id,
      },
    });
    utils.success(res, { content: companiesService.formatFromDb(_company) });
  } catch (err) {
    utils.fail(res, { message: 'Unable to update this company.' });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      utils.success(res, {
        message: 'Successfully deleted company.',
      });
    } else {
      utils.fail(res, { message: 'Unable to delete this company.' });
    }
  } catch (err) {
    utils.fail(res, err);
  }
};

export default {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
};
