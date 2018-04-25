import express from 'express'
import passport from 'passport'

import AuthController from '../controllers/auth/AuthController'
import CompaniesController from '../controllers/companies/CompaniesController'
import UsersController from '../controllers/users/UsersController'
import SalesController from '../controllers/sales/SalesController'

require('./../middleware/passport')(passport)

const router = express.Router()
const authenticateViaToken = passport.authenticate('jwt', { session: false })

// ===================================================
// '/auth'
// =========================
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)

// ===================================================
// '/companies'
// =========================
router.get('/companies', authenticateViaToken, CompaniesController.getCompanies) // only supser admins
router.post('/companies', authenticateViaToken, CompaniesController.addCompany) // only super admins
router.put('/companies', authenticateViaToken, CompaniesController.updateCompany) // only super admins
router.delete('/companies', authenticateViaToken, CompaniesController.deleteCompany) // only super admins

// ===================================================
// '/users'
// =========================
router.get('/users', authenticateViaToken, UsersController.getUsers) // only super admins
router.post('/users', authenticateViaToken, UsersController.addUser) // only super admins
router.delete('/users', authenticateViaToken, UsersController.deleteUser) // only super admins

// ===================================================
// '/sales'
// =========================
router.get('/sales', authenticateViaToken, SalesController.getSales) // only super admins
router.post('/sales', authenticateViaToken, SalesController.getSalesByCompanyName) // @todo convert to get/:companyName // only super admins

export default router
