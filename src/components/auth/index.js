import db from '../../db_models';
import AuthController from './auth_controller';
export default new AuthController(db.User);
