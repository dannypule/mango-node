import db from '../../db-models'
import { formatFromDb, formatForDb } from './CompaniesService'
import utils from '../../utils'

const CompaniesController = {}

CompaniesController.getCompanies = async (req, res) => {
  try {
    const limit = 15 // number of records per page

    const {
      page = 1, // page 1 default
      id = undefined, // undefined by default
    } = req.query

    const offset = limit * (page - 1) // define offset

    // default db query
    const dbQuery = {
      where: {},
      limit,
      offset,
      $sort: { id: 1 },
    }

    // ability to search by id
    if (id) {
      dbQuery.where = {
        ...dbQuery.where,
        id: parseInt(id, 10),
      }
    }

    const data = await db.Company.findAndCountAll(dbQuery)

    const pages = Math.ceil(data.count / limit)
    const formatted = data.rows.map(formatFromDb)
    utils.success(res, { data: formatted, count: data.count, pages, page })
  } catch (err) {
    utils.success(res, err)
  }
}

CompaniesController.addCompany = async (req, res) => {
  const formatted = formatForDb(req.body)

  try {
    const company = await db.Company.create(formatted)
    utils.success(res, company)
  } catch (err) {
    utils.fail(res, err)
  }
}

CompaniesController.updateCompany = async (req, res) => {
  const company = req.body

  try {
    await db.Company.update(
      {
        name: company.name,
      },
      {
        where: {
          id: company.id,
        },
      },
    )
    const _company = await db.Company.findOne({
      where: {
        id: req.body.id,
      },
    })
    utils.success(res, formatFromDb(_company))
  } catch (err) {
    utils.fail(res, { message: 'Unable to update this company.' })
  }
}

CompaniesController.deleteCompany = async (req, res) => {
  try {
    const result = await db.Company.destroy({
      where: {
        id: req.body.id,
      },
    })
    if (result === 1) {
      utils.success(res, {
        message: 'Successfully deleted company.',
      })
    } else {
      utils.fail(res, { message: 'Unable to delete this company.' })
    }
  } catch (err) {
    utils.fail(res, err)
  }
}

export default CompaniesController
