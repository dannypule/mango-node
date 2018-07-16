import db from '../../db_models';
import CompaniesController from './companies_controller';
export default new CompaniesController({ model: db.Company, modelUserCompany: db.UserCompany });
