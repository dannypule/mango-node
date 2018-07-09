import colors from 'colors/safe';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.UserProject.create({
        user_id: 1,
        project_id: 1,
      });

      await db.UserProject.create({
        user_id: 1,
        project_id: 2,
      });

      await db.UserProject.create({
        user_id: 2,
        project_id: 3,
      });

      console.log(colors.green('Demo items inserted into UserProject table.'));
      resolve();
    } catch (err) {
      console.log(colors.red('Unable to perform action', err));
      reject(err);
    }
  });
};
