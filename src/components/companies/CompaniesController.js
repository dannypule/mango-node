import db from '../../db-models'
import { formatDbResponse, formatForDb } from './CompaniesService'
import utils from '../../utils'

const CompaniesController = {}

CompaniesController.getCompanies = async (req, res) => {
  try {
    const companies = await db.Company.findAll()
    const formatted = companies.map(formatDbResponse)
    utils.success(res, formatted)
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
    utils.success(res, formatDbResponse(_company))
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
