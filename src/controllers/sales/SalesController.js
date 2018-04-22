// import express from 'express'
import db from '../../models'
import { formatGetSalesItemResponse } from './SalesService'
import utils from '../../utils/utils'

const SalesController = {}

SalesController.getSales = async (req, res) => {
  try {
    const sales = await db.Sales.findAll()
    const formatted = sales.map(formatGetSalesItemResponse)
    utils.success(res, formatted)
  } catch (err) {
    utils.error(res, err)
  }
}

SalesController.getSalesByCompanyName = async (req, res) => {
  try {
    const sales = await db.Sales.findAll({
      where: {
        CompanyName: req.body.companyName,
      },
    })
    const formatted = sales.map(formatGetSalesItemResponse)
    utils.success(res, formatted)
  } catch (err) {
    utils.error(res, err)
  }
}

export default SalesController