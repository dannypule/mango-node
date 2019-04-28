import express from 'express';
import passport from 'passport';

import authController from '../components/auth/auth_controller';
import companiesController from '../components/companies/companies_controller';
import healthClubsController from '../components/health_clubs/health_clubs_controller';
import usersController from '../components/users/users_controller';
import projectsController from '../components/projects/projects_controller';
import userProjectsController from '../components/user_projects/user_projects_controller';
import healthClubAddressesController from '../components/health_club_addresses/health_club_addresses_controller';
import healthClubPhoneNumbersController from '../components/health_club_phone_numbers/health_club_phone_numbers_controller';
import userAddressesController from '../components/user_addresses/user_addresses_controller';
import userPhoneNumbersController from '../components/user_phone_numbers/user_phone_numbers_controller';
import { accessControls, SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN } from '../middleware/accessControls';

require('./../middleware/passport')(passport);

const router = express.Router();
const authenticateViaToken = passport.authenticate('jwt', { session: false });

// ===================================================
// '/api/auth'
// =========================
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// ===================================================
// '/api/companies'
// =========================
router.get(
  '/companies',
  authenticateViaToken,
  accessControls([SELF, COMPANY_EDITOR, COMPANY_ADMIN]), // todo limit self
  companiesController.getCompanies
);
router.post(
  '/companies',
  authenticateViaToken,
  accessControls([COMPANY_EDITOR, COMPANY_ADMIN]),
  companiesController.addCompany
);
router.put(
  '/companies',
  authenticateViaToken,
  accessControls([COMPANY_EDITOR, COMPANY_ADMIN]),
  companiesController.updateCompany
);
router.delete('/companies', authenticateViaToken, accessControls([]), companiesController.deleteCompany);

// ===================================================
// '/api/health_clubs'
// =========================
router.get(
  '/health_clubs',
  authenticateViaToken,
  accessControls([SELF, COMPANY_EDITOR, COMPANY_ADMIN]), // todo limit self
  healthClubsController.getHealthClubs
);
router.post(
  '/health_clubs',
  authenticateViaToken,
  accessControls([COMPANY_EDITOR, COMPANY_ADMIN]),
  healthClubsController.addHealthClub
);
router.put(
  '/health_clubs',
  authenticateViaToken,
  accessControls([COMPANY_EDITOR, COMPANY_ADMIN]),
  healthClubsController.updateHealthClub
);
router.delete('/health_clubs', authenticateViaToken, accessControls([]), healthClubsController.deleteHealthClub);

// ===================================================
// '/api/users'
// =========================
router.get(
  '/users',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.getUsers
);
router.post(
  '/users/add_user',
  authenticateViaToken,
  accessControls([COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.addUser
);
router.put(
  '/users/update_user',
  authenticateViaToken,
  accessControls([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updateWholeUser
);
router.put(
  '/users/update_email',
  authenticateViaToken,
  accessControls([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updateEmail
);
router.put(
  '/users/update_name',
  authenticateViaToken,
  accessControls([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updateName
);
router.put(
  '/users/update_password',
  authenticateViaToken,
  accessControls([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updatePassword
);
router.put(
  '/users/update_status',
  authenticateViaToken,
  accessControls([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.changeUserStatus
);
router.delete('/users/remove_user', authenticateViaToken, accessControls([COMPANY_ADMIN]), usersController.removeUser);

// ===================================================
// '/api/projects'
// =========================
router.get(
  '/projects',
  authenticateViaToken,
  accessControls([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  projectsController.getProjects
);
router.post(
  '/projects',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  projectsController.addProject
);
router.put(
  '/projects',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  projectsController.updateProject
);
router.delete('/projects', authenticateViaToken, accessControls([COMPANY_ADMIN]), projectsController.deleteProject);

// ===================================================
// '/api/user_projects'
// =========================
router.get(
  '/user_projects',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  userProjectsController.getUserProjects
);
router.post(
  '/user_projects',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  userProjectsController.addUserProject
);
router.put(
  '/user_projects',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  userProjectsController.updateUserProject
);
router.delete(
  '/user_projects',
  authenticateViaToken,
  accessControls([COMPANY_ADMIN]),
  userProjectsController.deleteUserProject
);

// ===================================================
// '/api/health_club_addresses'
// =========================
router.get(
  '/health_club_addresses',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  healthClubAddressesController.getHealthClubAddresses
);
router.post(
  '/health_club_addresses',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  healthClubAddressesController.addHealthClubAddress
);
router.put(
  '/health_club_addresses',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  healthClubAddressesController.updateHealthClubAddress
);
router.delete(
  '/health_club_addresses',
  authenticateViaToken,
  accessControls([COMPANY_ADMIN]),
  healthClubAddressesController.deleteHealthClubAddress
);

// ===================================================
// '/api/health_club_phone_numbers'
// =========================
router.get(
  '/health_club_phone_numbers',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  healthClubPhoneNumbersController.getHealthClubPhoneNumbers
);
router.post(
  '/health_club_phone_numbers',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  healthClubPhoneNumbersController.addHealthClubPhoneNumber
);
router.put(
  '/health_club_phone_numbers',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  healthClubPhoneNumbersController.updateHealthClubPhoneNumber
);
router.delete(
  '/health_club_phone_numbers',
  authenticateViaToken,
  accessControls([COMPANY_ADMIN]),
  healthClubPhoneNumbersController.deleteHealthClubPhoneNumber
);

// ===================================================
// '/api/user_addresses'
// =========================
router.get(
  '/user_addresses',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  userAddressesController.getUserAddresses
);
router.post(
  '/user_addresses',
  authenticateViaToken,
  accessControls([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  userAddressesController.addUserAddress
);
router.put(
  '/user_addresses',
  authenticateViaToken,
  accessControls([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  userAddressesController.updateUserAddress
);
router.delete(
  '/user_addresses',
  authenticateViaToken,
  accessControls([COMPANY_ADMIN]),
  userAddressesController.deleteUserAddress
);

// ===================================================
// '/api/user_phone_numbers'
// =========================
router.get(
  '/user_phone_numbers',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  userPhoneNumbersController.getUserPhoneNumbers
);
router.post(
  '/user_phone_numbers',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  userPhoneNumbersController.addUserPhoneNumber
);
router.put(
  '/user_phone_numbers',
  authenticateViaToken,
  accessControls([SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  userPhoneNumbersController.updateUserPhoneNumber
);
router.delete(
  '/user_phone_numbers',
  authenticateViaToken,
  accessControls([COMPANY_ADMIN]),
  userPhoneNumbersController.deleteUserPhoneNumber
);

export default router;
