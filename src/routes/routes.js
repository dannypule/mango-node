import express from 'express'
import passport from 'passport'

import AuthController from '../controllers/auth/AuthController'
import CarsController from '../controllers/cars/CarsController'
import UsersController from '../controllers/users/UsersController'
import SalesController from '../controllers/sales/SalesController'

require('./../middleware/passport')(passport)

const router = express.Router()
const authenticateViaToken = passport.authenticate('jwt', { session: false })

// ===================================================
// '/auth'
// =========================
router.post('/auth/login', AuthController.login)

// ===================================================
// '/cars'
// =========================
router.get('/cars', CarsController.getCars) // only supser admins
router.post('/cars', authenticateViaToken, CarsController.addCar) // only super admins
router.put('/cars', authenticateViaToken, CarsController.updateCar) // only super admins
router.delete('/cars', authenticateViaToken, CarsController.deleteCar) // only super admins

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
