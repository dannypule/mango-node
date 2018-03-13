import express from 'express';
import db from '../../db-schema';
import { formatGetSalesItemResponse } from './sales.helpers';

export const getAllSales = (req, res) => {
  db.Sales.findAll().then(sales => {
    const formatted = sales.map(formatGetSalesItemResponse);
    res.send(formatted);
  });
};

export const getSalesByCompanyName = (req, res) => {
  db.Sales.findAll({
    where: {
      CompanyName: req.body.companyName,
    },
  }).then(sales => {
    const formatted = sales.map(formatGetSalesItemResponse);
    res.send(formatted);
  });
};
