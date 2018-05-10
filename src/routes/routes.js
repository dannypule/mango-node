import express from 'express'
import passport from 'passport'

import AuthController from '../components/auth/AuthController'
import CompaniesController from '../components/companies/CompaniesController'
import UsersController from '../components/users/UsersController'
import ProjectsController from '../components/projects/ProjectsController'

require('./../middleware/passport')(passport)

const router = express.Router()
const authenticateViaToken = passport.authenticate('jwt', { session: false })

// ===================================================
// '/api/auth'
// =========================
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)

// ===================================================
// '/api/companies'
// =========================
router.get('/companies', authenticateViaToken, CompaniesController.getCompanies) // only super admins
router.post('/companies', authenticateViaToken, CompaniesController.addCompany) // only super admins
router.put('/companies', authenticateViaToken, CompaniesController.updateCompany) // only super admins
router.delete('/companies', authenticateViaToken, CompaniesController.deleteCompany) // only super admins

// ===================================================
// '/api/users'
// =========================
router.get('/users', authenticateViaToken, UsersController.getUsers) // only super admins
router.post('/users', authenticateViaToken, UsersController.addUser) // only super admins
router.delete('/users', authenticateViaToken, UsersController.deleteUser) // only super admins

// ===================================================
// '/api/projects'
// =========================
router.get('/projects', authenticateViaToken, ProjectsController.getProjects) // only super admins
router.post('/projects', authenticateViaToken, ProjectsController.addProject) // only super admins
router.put('/projects', authenticateViaToken, ProjectsController.updateProject) // only super admins
router.delete('/projects', authenticateViaToken, ProjectsController.deleteProject) // only super admins

export default router
