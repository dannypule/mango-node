import db from '../../db_models';
import ProjectsController from './projects_controller';
export default new ProjectsController({ model: db.Project });
