import { getStatusText, FORBIDDEN } from 'http-status-codes';
import utils from '../utils/utils';

export const SELF = 'SELF';
export const COMPANY_REGULAR = 20;
export const COMPANY_VIEWER = 30;
export const COMPANY_EDITOR = 40;
export const COMPANY_ADMIN = 50;
export const ADMIN = 100;
export const SUPERADMIN = 110;

const authorised = next => next();
const notAuthorised = res => utils.fail(res, { message: getStatusText(FORBIDDEN) }, FORBIDDEN);

export const access = allowedRoles => async (req, res, next) => {
  const { user: dbUser } = req;
  const sessionUser = req.body;

  if (allowedRoles.includes(SELF) && sessionUser && sessionUser.id && dbUser.id === sessionUser.id) {
    return authorised(next);
  }
  if (allowedRoles.includes(COMPANY_VIEWER) && dbUser.userRoleCode === COMPANY_VIEWER) {
    return authorised(next);
  }
  if (allowedRoles.includes(COMPANY_EDITOR) && dbUser.userRoleCode === COMPANY_EDITOR) {
    return authorised(next);
  }
  if (allowedRoles.includes(COMPANY_ADMIN) && dbUser.userRoleCode === COMPANY_ADMIN) {
    return authorised(next);
  }
  if (dbUser.userRoleCode >= ADMIN) {
    return authorised(next);
  }

  notAuthorised(res);
};
