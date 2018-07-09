import db from '../../db_models';
import UserAddressesController from './user_addresses_controller';
export default new UserAddressesController(db.UserAddress);
