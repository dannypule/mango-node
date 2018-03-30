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
router.get('/cars', authenticateViaToken, CarsController.getCars)
router.post('/cars', authenticateViaToken, CarsController.addCar)
router.put('/cars', authenticateViaToken, CarsController.updateCar)
router.delete('/cars', authenticateViaToken, CarsController.deleteCar)

// ===================================================
// '/users'
// =========================
router.get('/users', authenticateViaToken, UsersController.getUsers)
router.post('/users', authenticateViaToken, UsersController.addUser)
router.delete('/users', authenticateViaToken, UsersController.deleteUser)

// ===================================================
// '/sales'
// =========================
router.get('/sales', authenticateViaToken, SalesController.getSales)
router.post('/sales', authenticateViaToken, SalesController.getSalesByCompanyName) // @todo convert to get/:companyName

export default router
