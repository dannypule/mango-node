import db from '../../db-models'
import { formatCompanyResponse, formatCompanyDbSave } from './CompaniesService'
import utils from '../../utils/utils'

const CompaniesController = {}

CompaniesController.getCompanies = async (req, res) => {
  try {
    console.log(null)
    const Companies = await db.Company.findAll()
    const formatted = Companies.map(formatCompanyResponse)
    utils.success(res, formatted)
  } catch (err) {
    utils.success(res, err)
  }
}

CompaniesController.addCompany = async (req, res) => {
  const formatted = formatCompanyDbSave(req.body)

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
    utils.success(res, formatCompanyResponse(_company)) // todo - format _car
  } catch (err) {
    utils.fail(res, err)
  }
}

CompaniesController.deleteCompany = async (req, res) => {
  try {
    await db.Company.destroy({
      where: {
        id: req.body.id,
      },
    })
    utils.success(res, {
      message: 'Successfully deleted company.',
    })
  } catch (err) {
    utils.fail(res, err)
  }
}

export default CompaniesController
