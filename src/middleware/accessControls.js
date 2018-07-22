import db from '../db_models';
import utils from '../utils/utils';

export const SUPERADMIN = 110;
export const ADMIN = 100;
export const COMPANY_ADMIN = 50;
export const COMPANY_EDITOR = 40;
export const COMPANY_VIEWER = 30;
export const COMPANY_REGULAR = 20;
export const SELF = 'SELF';


// user can view, update, add his own user data
// user can only view users from his company
// user can only update users from his company with company_editor or company_admin permissing
// user can only add users to his company with company_editor or company_admin permissing

export const usersRoutes = {
  accessControls: (allowedRoles) => async (req, res, next) => {
    const authUser = req.user;
    const reqUser = req.body;

    if (allowedRoles.includes(SELF)) {
      if (authUser.id === reqUser.id) {
        return next();
      }
    }

    if (allowedRoles.includes(COMPANY_VIEWER)) {
      if (authUser.userRoleCode === COMPANY_VIEWER) {
        return next();
      }
    }

    if (allowedRoles.includes(COMPANY_EDITOR)) {
      if (authUser.userRoleCode === COMPANY_EDITOR) {
        return next();
      }
    }

    if (allowedRoles.includes(COMPANY_ADMIN)) {
      if (authUser.userRoleCode === COMPANY_ADMIN) {
        return next();
      }
    }

    if (authUser.userRoleCode >= ADMIN) {
      return next();
    }

    utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
    // utils.fail(res, { message: [authUser, reqUser] }, 403);
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

