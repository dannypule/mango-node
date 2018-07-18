import db from '../db_models';
import utils from '../utils/utils';

export const users = {
  accessControls: (allowedUsers) => async (req, res, next) => {
    const userIdFromRequest = req.body.id;
    const authenticatedUser = req.user;

    if (allowedUsers.includes('SELF')) {
      if (userIdFromRequest === authenticatedUser.id) {
        return next();
      }
    }
    if (allowedUsers.includes('MANAGER')) {
      if (userIdFromRequest === authenticatedUser.id) { // todo - if the user.id is on the item's manager's list
        return next();
      }
    }
    if (allowedUsers.includes('ADMIN')) {
      if (authenticatedUser.userRoleCode >= 100) {
        return next();
      }
    }
    utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
  },
};

export const companies = {
  accessControls: (allowedUsers) => async (req, res, next) => {
    const companyIdFromRequest = req.body.id;
    const authenticatedUser = req.user;
    const result = await db.UserCompany.find({
      where: {
        user_id: authenticatedUser.id,
        company_id: companyIdFromRequest,
      },
    });

    if (result && allowedUsers.includes(result.access_type)) {
      return next();
    }
    if (allowedUsers.includes('ADMIN')) {
      if (authenticatedUser.userRoleCode >= 100) {
        return next();
      }
    }
    utils.fail(res, { message: 'You are not allowed to perform that action.' }, 403);
  },
};

