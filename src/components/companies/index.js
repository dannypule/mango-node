import db from '../../db_models';
import CompaniesController from './companies_controller';
import utils from '../../utils/utils';
export default new CompaniesController({ model: db.Company, utils });
