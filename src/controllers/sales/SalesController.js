// import express from 'express'
import db from '../../models'
import { formatGetSalesItemResponse } from './SalesService'
import utils from '../../utils/utils'

const SalesController = {}

SalesController.getSales = (req, res) => {
  db.Sales.findAll().then(sales => {
    const formatted = sales.map(formatGetSalesItemResponse)
    utils.success(res, formatted)
  })
}

SalesController.getSalesByCompanyName = (req, res) => {
  db.Sales.findAll({
    where: {
      CompanyName: req.body.companyName,
    },
  })
    .then(sales => {
      const formatted = sales.map(formatGetSalesItemResponse)
      utils.success(res, formatted)
    })
    .catch(err => utils.error(res, err))
}

export default SalesController
