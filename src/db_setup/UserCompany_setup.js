import colors from 'colors/safe';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      for (let i = 6; i < 150; i++) {
        db.UserCompany.create({
          user_id: i,
          company_id: i,
        }).then(() => {
          if (i === 149) {
            console.log(colors.green('Demo items inserted into UserCompany table.'));
            resolve();
          }
        });
      }
    } catch (err) {
      console.log(colors.red('Unable to perform action', err));
      reject(err);
    }
  });
};
