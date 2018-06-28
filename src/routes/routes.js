import express from 'express';
import passport from 'passport';

import AuthController from '../components/auth/auth_controller';
import CompaniesController from '../components/companies/companies_controller';
import UsersController from '../components/users/users_controller';
import ProjectsController from '../components/projects/projects_controller';
import UserProjectsController from '../components/user_projects/user_projects_controller';
import CompanyAddressesController from '../components/company_addresses/company_addresses_controller';
import CompanyPhoneNumbersController from '../components/company_phone_numbers/company_phone_numbers_controller';
import UserAddressesController from '../components/user_addresses/user_addresses_controller';
import UserPhoneNumbersController from '../components/user_phone_numbers/user_phone_numbers_controller';

require('./../middleware/passport')(passport);

const router = express.Router();
const authenticateViaToken = passport.authenticate('jwt', { session: false });

// ===================================================
// '/api/auth'
// =========================
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

// ===================================================
// '/api/companies'
// =========================
router.get('/companies', authenticateViaToken, CompaniesController.getCompanies); // only super admins
router.post('/companies', authenticateViaToken, CompaniesController.addCompany); // only super admins
router.put('/companies', authenticateViaToken, CompaniesController.updateCompany); // only super admins
router.delete('/companies', authenticateViaToken, CompaniesController.deleteCompany); // only super admins

// ===================================================
// '/api/users'
// =========================
router.get('/users', authenticateViaToken, UsersController.getUsers); // only super admins
router.post('/users', authenticateViaToken, UsersController.addUser); // only super admins
router.delete('/users', authenticateViaToken, UsersController.deleteUser); // only super admins

// ===================================================
// '/api/projects'
// =========================
router.get('/projects', authenticateViaToken, ProjectsController.getProjects); // only super admins
router.post('/projects', authenticateViaToken, ProjectsController.addProject); // only super admins
router.put('/projects', authenticateViaToken, ProjectsController.updateProject); // only super admins
router.delete('/projects', authenticateViaToken, ProjectsController.deleteProject); // only super admins

// ===================================================
// '/api/user_projects'
// =========================
router.get('/user_projects', authenticateViaToken, UserProjectsController.getUserProjects); // only super admins
router.post('/user_projects', authenticateViaToken, UserProjectsController.addUserProject); // only super admins
router.put('/user_projects', authenticateViaToken, UserProjectsController.updateUserProject); // only super admins
router.delete('/user_projects', authenticateViaToken, UserProjectsController.deleteUserProject); // only super admins

// ===================================================
// '/api/company_addresses'
// =========================
router.get('/company_addresses', authenticateViaToken, CompanyAddressesController.getCompanyAddresses); // only super admins
router.post('/company_addresses', authenticateViaToken, CompanyAddressesController.addCompanyAddress); // only super admins
router.put('/company_addresses', authenticateViaToken, CompanyAddressesController.updateCompanyAddress); // only super admins
router.delete('/company_addresses', authenticateViaToken, CompanyAddressesController.deleteCompanyAddress); // only super admins

// ===================================================
// '/api/company_phone_numbers'
// =========================
router.get('/company_phone_numbers', authenticateViaToken, CompanyPhoneNumbersController.getCompanyPhoneNumbers); // only super admins
router.post('/company_phone_numbers', authenticateViaToken, CompanyPhoneNumbersController.addCompanyPhoneNumber); // only super admins
router.put('/company_phone_numbers', authenticateViaToken, CompanyPhoneNumbersController.updateCompanyPhoneNumber); // only super admins
router.delete('/company_phone_numbers', authenticateViaToken, CompanyPhoneNumbersController.deleteCompanyPhoneNumber); // only super admins

// ===================================================
// '/api/user_addresses'
// =========================
router.get('/user_addresses', authenticateViaToken, UserAddressesController.getUserAddresses); // only super admins
router.post('/user_addresses', authenticateViaToken, UserAddressesController.addUserAddress); // only super admins
router.put('/user_addresses', authenticateViaToken, UserAddressesController.updateUserAddress); // only super admins
router.delete('/user_addresses', authenticateViaToken, UserAddressesController.deleteUserAddress); // only super admins

// ===================================================
// '/api/user_phone_numbers'
// =========================
router.get('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.getUserPhoneNumbers); // only super admins
router.post('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.addUserPhoneNumber); // only super admins
router.put('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.updateUserPhoneNumber); // only super admins
router.delete('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.deleteUserPhoneNumber); // only super admins

export default router;
