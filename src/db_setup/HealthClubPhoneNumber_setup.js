import colors from 'colors/safe';
import faker from 'faker';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: companies, count: companiesCount } = await db.Company.findAndCountAll();

      companies.forEach(async (company, index) => {
        db.HealthClubPhoneNumber.create({
          phone: faker.phone.phoneNumber(),
          type_code: Math.floor(Math.random() * 3) + 1,
          health_club_uuid: company.uuid
        }).then(() => {
          if (index === companiesCount - 1) {
            console.log(colors.green('Demo items inserted into HealthClubPhoneNumber table.'));
            resolve();
          }
        });
      });
    } catch (err) {
      console.log(colors.red('Unable to perform action', err));
      reject(err);
    }
  });
};
