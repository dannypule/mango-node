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
import { access, SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN } from '../middleware/accessControls';

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
router.get('/companies', authenticateViaToken, access([]), CompaniesController.getCompanies);
router.post('/companies', authenticateViaToken, access([COMPANY_EDITOR, COMPANY_ADMIN]), CompaniesController.addCompany);
router.put('/companies', authenticateViaToken, access([COMPANY_EDITOR, COMPANY_ADMIN]), CompaniesController.updateCompany);
router.delete('/companies', authenticateViaToken, access([]), CompaniesController.deleteCompany);

// ===================================================
// '/api/users'
// =========================
router.get(
  '/users',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.getUsers,
); // request should start off not permitted

router.post(
  '/users/add_user',
  authenticateViaToken,
  access([COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.addUser,
);

router.put(
  '/users/update_user',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updateWholeUser,
);

router.put(
  '/users/update_email',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updateEmail,
);

router.put(
  '/users/update_name',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updateName,
);

router.put(
  '/users/update_password',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updatePassword,
);

router.put(
  '/users/update_status',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.changeUserStatus,
);

router.delete(
  '/users/remove_user',
  authenticateViaToken,
  access([]),
  usersController.removeUser,
);

router.delete(
  '/users/remove_user_by_email',
  authenticateViaToken,
  access([]),
  usersController.removeUserByEmail,
);

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
router.get(
  '/user_addresses',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  UserAddressesController.getUserAddresses,
);

router.post(
  '/user_addresses',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  UserAddressesController.addUserAddress,
);

router.put(
  '/user_addresses',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  UserAddressesController.updateUserAddress,
);

router.delete(
  '/user_addresses',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  UserAddressesController.deleteUserAddress);

// ===================================================
// '/api/user_phone_numbers'
// =========================
router.get('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.getUserPhoneNumbers);
router.post('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.addUserPhoneNumber);
router.put('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.updateUserPhoneNumber);
router.delete('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.deleteUserPhoneNumber);

export default router;
