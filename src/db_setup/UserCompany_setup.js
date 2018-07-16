import colors from 'colors/safe';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.UserCompany.create({
        user_id: 1,
        company_id: 1,
      });

      await db.UserCompany.create({
        user_id: 1,
        company_id: 2,
      });

      await db.UserCompany.create({
        user_id: 2,
        company_id: 3,
      });

      console.log(colors.green('Demo items inserted into UserCompany table.'));
      resolve();
    } catch (err) {
      console.log(colors.red('Unable to perform action', err));
      reject(err);
    }
  });
};
