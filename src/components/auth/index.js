import db from '../../db_models';
import AuthController from './auth_controller';
import UsersService from '../users/users_service';

export const usersService = new UsersService(db.User);
export default new AuthController({ model: db.User, usersService });
