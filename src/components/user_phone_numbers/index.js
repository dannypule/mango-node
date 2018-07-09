import db from '../../db_models';
import UserPhoneNumbersController from './user_phone_numbers_controller';
export default new UserPhoneNumbersController(db.UserPhoneNumber);
