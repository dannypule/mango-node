import db from '../../db_models';
import utils from '../../utils/utils';
import AuthController from './auth_controller';
import UsersService from '../users/users_service';

export const usersService = new UsersService({ model: db.User, utils });
export default new AuthController({ model: db.User, usersService, utils });
