import colors from 'colors/safe';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: users, count: usersCount } = await db.User.findAndCountAll();
      const { rows: project, count: projectCount } = await db.Project.findAndCountAll();

      for (let i = 0; i < 200; i++) {
        db.UserProject.create({
          user_uuid: users[Math.floor(Math.random() * (usersCount - 1))].uuid,
          project_uuid: project[Math.floor(Math.random() * (projectCount - 1))].uuid,
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
