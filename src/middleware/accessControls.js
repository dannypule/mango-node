import db from '../db_models';
import utils from '../utils/utils';

export const APP_ROLES = {
  SUPERADMIN: 110,
  ADMIN: 100,
  COMPANY_ADMIN: 50,
  COMPANY_EDITOR: 40,
  COMPANY_VIEWER: 30,
  COMPANY_REGULAR: 20,
  SELF: 'SELF',
};

// user can view, update, add his own user data
// user can only view users from his company
// user can only update users from his company with company_editor or company_admin permissing
// user can only add users to his company with company_editor or company_admin permissing

export const users = {
  accessControls: (allowedRoles) => async (req, res, next) => {
    const { user } = req;

    if (allowedRoles.includes(APP_ROLES.COMPANY_VIEWER)) {
      if (user.userRoleCode === APP_ROLES.COMPANY_VIEWER) {
        return next();
      }
    }

    if (allowedRoles.includes(APP_ROLES.COMPANY_EDITOR)) {
      if (user.userRoleCode === APP_ROLES.COMPANY_EDITOR) {
        return next();
      }
    }

    if (allowedRoles.includes(APP_ROLES.COMPANY_ADMIN)) {
      if (user.userRoleCode === APP_ROLES.COMPANY_ADMIN) {
        return next();
      }
    }

    if (user.userRoleCode >= APP_ROLES.ADMIN) {
      return next();
    }

    utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
  },
  allowSelf: () => (req, res, next) => {
    const { user } = req;
    const userFromBody = req.user;

    if (user.id === userFromBody.id) {
      return next();
    }

    if (user.userRoleCode >= APP_ROLES.ADMIN) {
      return next();
    }

    utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
  },
};

export const companies = {
  accessControls: (allowedRoles) => async (req, res, next) => {
    const companyIdFromRequest = req.body.id;
    const authenticatedUser = req.user;
    const result = await db.UserCompany.find({
      where: {
        user_id: authenticatedUser.id,
        company_id: companyIdFromRequest,
      },
    });

    if (result && allowedRoles.includes(result.access_type)) {
      return next();
    }
    if (allowedRoles.includes('ADMIN')) {
      if (authenticatedUser.userRoleCode >= 100) {
        return next();
      }
    }
    utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
  },
};

