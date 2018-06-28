import db from '../../db_models';
import CompanyAddressesController from './company_addresses_controller';
export default new CompanyAddressesController(db.CompanyAddress);
