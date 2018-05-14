import express from 'express'
import passport from 'passport'

import AuthController from '../components/auth/auth_controller'
import CompaniesController from '../components/companies/companies_controller'
import UsersController from '../components/users/users_controller'
import ProjectsController from '../components/projects/projects_controller'
import UserProjectsController from '../components/user_projects/user_projects_controller'

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

// ===================================================
// '/api/user_projects'
// =========================
router.get('/user_projects', authenticateViaToken, UserProjectsController.getUserProjects) // only super admins
router.post('/user_projects', authenticateViaToken, UserProjectsController.addUserProject) // only super admins
router.put('/user_projects', authenticateViaToken, UserProjectsController.updateUserProject) // only super admins
router.delete('/user_projects', authenticateViaToken, UserProjectsController.deleteUserProject) // only super admins

export default router
