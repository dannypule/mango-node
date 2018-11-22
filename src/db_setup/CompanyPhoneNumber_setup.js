import colors from 'colors/safe';
import faker from 'faker';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: companies, count: companiesCount } = await db.Company.findAndCountAll();

      for (let i = 0; i < 200; i++) {
        db.CompanyPhoneNumber.create({
          phone: faker.phone.phoneNumber(),
          type_code: Math.floor(Math.random() * 3) + 1,
          company_uuid: companies[Math.floor(Math.random() * (companiesCount - 1))].uuid,
        }).then(() => {
          if (i === 199) {
            console.log(colors.green('Demo items inserted into CompanyPhoneNumber table.'));
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
