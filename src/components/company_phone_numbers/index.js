import db from '../../db_models';
import CompanyPhoneNumbersController from './company_phone_numbers_controller';
export default new CompanyPhoneNumbersController({ model: db.CompanyPhoneNumber });
