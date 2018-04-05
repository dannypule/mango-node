// import express from 'express'
import db from '../../db-schema'
import { formatGetSalesItemResponse } from './SalesService'

const SalesController = {}

SalesController.getSales = (req, res) => {
  db.Sales.findAll().then(sales => {
    const formatted = sales.map(formatGetSalesItemResponse)
    res.send(formatted)
  })
}

SalesController.getSalesByCompanyName = (req, res) => {
  db.Sales.findAll({
    where: {
      CompanyName: req.body.companyName,
    },
  }).then(sales => {
    const formatted = sales.map(formatGetSalesItemResponse)
    res.send(formatted)
  })
}

export default SalesController
