import db from '../../db_models';
import UserProjectsController from './user_projects_controller';
export default new UserProjectsController({ model: db.UserProject });
