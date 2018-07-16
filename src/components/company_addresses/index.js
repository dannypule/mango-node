import db from '../../db_models';
import utils from '../../utils/utils';
import CompanyAddressesController from './company_addresses_controller';
export default new CompanyAddressesController({ model: db.CompanyAddress, utils });
