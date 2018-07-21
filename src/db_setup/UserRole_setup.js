import colors from 'colors/safe';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.UserRole.create({
        code: 20,
        description: 'Company Regular',
      });
      await db.UserRole.create({
        code: 30,
        description: 'Company Viewer',
      });
      await db.UserRole.create({
        code: 40,
        description: 'Company Editor',
      });
      await db.UserRole.create({
        code: 50,
        description: 'Company Admin',
      });
      await db.UserRole.create({
        code: 100,
        description: 'Admin',
      });
      await db.UserRole.create({
        code: 110,
        description: 'Super Admin',
      });

      console.log(colors.green('Demo items inserted into UserRole table.'));
      resolve();
    } catch (err) {
      console.log(colors.red('Unable to perform action', err));
      reject(err);
    }
  });
};
