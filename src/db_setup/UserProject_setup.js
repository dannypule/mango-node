import colors from 'colors/safe';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < 200; i++) {
        db.UserProject.create({
          user_id: Math.floor(Math.random() * 50) + 1,
          project_id: Math.floor(Math.random() * 50) + 1,
          access_type: ['FULL', 'EDITOR', 'VIEWER'][Math.floor(Math.random() * 3)],
        }).then(() => {
          if (i === 199) {
            console.log(colors.green('Demo items inserted into UserProject table.'));
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
