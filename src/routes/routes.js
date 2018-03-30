import express from 'express'
import passport from 'passport'

import AuthController from '../controllers/auth/AuthController'
import CarsController from '../controllers/cars/CarsController'
import UsersController from '../controllers/users/UsersController'
import SalesController from '../controllers/sales/SalesController'

require('./../middleware/passport')(passport)

const router = express.Router()

// ===================================================
// '/auth'
// =========================
router.post('/login', AuthController.login)

// ===================================================
// '/cars'
// =========================
router.get('/cars', passport.authenticate('jwt', { session: false }), CarsController.getCars)
router.post('/cars', CarsController.addCar)
router.put('/cars', CarsController.updateCar)
router.delete('/cars', CarsController.deleteCar)

// ===================================================
// '/users'
// =========================
router.get('/users', UsersController.getUsers)
router.post('/users', UsersController.addUser)
router.delete('/users', UsersController.deleteUser)

// ===================================================
// '/sales'
// =========================
router.get('/sales', SalesController.getSales)
router.post('/sales', SalesController.getSalesByCompanyName) // @todo convert to get/:companyName

export default router
