import colors from 'colors/safe';
import db from '../db_models';
import faker from 'faker';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Company.create({
        name: 'Google',
      });

      await db.Company.create({
        name: 'Apple',
      });

      for (let i = 0; i < 100; i++) {
        db.Company.create({
          name: faker.company.companyName(),
        }).then(() => {
          if (i === 99) {
            console.log(colors.green('Demo items inserted into Company table.'));
            resolve();
          }
        });
      }
    } catch (err) {
      console.log(colors.red('Unable to perform action', err));
      reject();
    }
  });
};
