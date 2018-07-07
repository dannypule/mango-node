import db from '../../db_models';
import utils from '../../utils';
import UsersController from './users_controller';
import UsersService from './users_service';

export const usersService = new UsersService(db.User);
export const usersController = new UsersController(db.User, utils, usersService);
