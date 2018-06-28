import db from '../../db_models';
import UserController from './users_controller';
export default new UserController(db.User);
