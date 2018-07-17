import express from 'express';
import passport from 'passport';

import AuthController from '../components/auth';
import CompaniesController from '../components/companies';
import { usersController } from '../components/users';
import ProjectsController from '../components/projects';
import UserProjectsController from '../components/user_projects';
import CompanyAddressesController from '../components/company_addresses';
import CompanyPhoneNumbersController from '../components/company_phone_numbers';
import UserAddressesController from '../components/user_addresses';
import UserPhoneNumbersController from '../components/user_phone_numbers';

require('./../middleware/passport')(passport);

const router = express.Router();
const authenticateViaToken = passport.authenticate('jwt', { session: false });
// const foo = CompaniesController;
// debugger;
// ===================================================
// '/api/auth'
// =========================
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

// ===================================================
// '/api/companies'
// =========================
router.get('/companies', authenticateViaToken, CompaniesController.getCompanies);
router.post('/companies', authenticateViaToken, CompaniesController.addCompany);
router.put('/companies', authenticateViaToken, CompaniesController.updateCompany);
router.delete('/companies', authenticateViaToken, CompaniesController.deleteCompany);

// ===================================================
// '/api/users'
// =========================
router.get('/users', authenticateViaToken, usersController.getUsers);
router.post('/users', authenticateViaToken, usersController.addUser);
router.put('/users', authenticateViaToken, usersController.updateUser);
router.put('/users/update_email', authenticateViaToken, usersController.updateEmail);
router.put('/users/update_name', authenticateViaToken, usersController.updateName);
router.put('/users/update_password', authenticateViaToken, usersController.updatePassword);
router.delete('/users', authenticateViaToken, usersController.deleteUser);

// ===================================================
// '/api/projects'
// =========================
router.get('/projects', authenticateViaToken, ProjectsController.getProjects);
router.post('/projects', authenticateViaToken, ProjectsController.addProject);
router.put('/projects', authenticateViaToken, ProjectsController.updateProject);
router.delete('/projects', authenticateViaToken, ProjectsController.deleteProject);

// ===================================================
// '/api/user_projects'
// =========================
router.get('/user_projects', authenticateViaToken, UserProjectsController.getUserProjects);
router.post('/user_projects', authenticateViaToken, UserProjectsController.addUserProject);
router.put('/user_projects', authenticateViaToken, UserProjectsController.updateUserProject);
router.delete('/user_projects', authenticateViaToken, UserProjectsController.deleteUserProject);

// ===================================================
// '/api/company_addresses'
// =========================
router.get('/company_addresses', authenticateViaToken, CompanyAddressesController.getCompanyAddresses);
router.post('/company_addresses', authenticateViaToken, CompanyAddressesController.addCompanyAddress);
router.put('/company_addresses', authenticateViaToken, CompanyAddressesController.updateCompanyAddress);
router.delete('/company_addresses', authenticateViaToken, CompanyAddressesController.deleteCompanyAddress);

// ===================================================
// '/api/company_phone_numbers'
// =========================
router.get('/company_phone_numbers', authenticateViaToken, CompanyPhoneNumbersController.getCompanyPhoneNumbers);
router.post('/company_phone_numbers', authenticateViaToken, CompanyPhoneNumbersController.addCompanyPhoneNumber);
router.put('/company_phone_numbers', authenticateViaToken, CompanyPhoneNumbersController.updateCompanyPhoneNumber);
router.delete('/company_phone_numbers', authenticateViaToken, CompanyPhoneNumbersController.deleteCompanyPhoneNumber);

// ===================================================
// '/api/user_addresses'
// =========================
router.get('/user_addresses', authenticateViaToken, UserAddressesController.getUserAddresses);
router.post('/user_addresses', authenticateViaToken, UserAddressesController.addUserAddress);
router.put('/user_addresses', authenticateViaToken, UserAddressesController.updateUserAddress);
router.delete('/user_addresses', authenticateViaToken, UserAddressesController.deleteUserAddress);

// ===================================================
// '/api/user_phone_numbers'
// =========================
router.get('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.getUserPhoneNumbers);
router.post('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.addUserPhoneNumber);
router.put('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.updateUserPhoneNumber);
router.delete('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.deleteUserPhoneNumber);

export default router;
