import colors from 'colors/safe';
import db from '../db_models';
import faker from 'faker';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      let company;

      // *** COMPANY 1 - Google ***
      company = await db.Company.create({
        name: 'Google',
      });
      await db.CompanyAddress.create({
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.company.bsAdjective(),
        address_line_3: faker.company.bsAdjective(),
        address_line_4: faker.company.bsAdjective(),
        town: faker.address.city(),
        county: faker.address.county(),
        country: faker.address.country(),
        post_code: faker.address.zipCode(),
        type_code: Math.floor(Math.random() * 3) + 1,
        company_id: company.id,
      });
      await db.CompanyPhoneNumber.create({
        phone: faker.phone.phoneNumber(),
        type_code: Math.floor(Math.random() * 3) + 1,
        company_id: company.id,
      });

      // *** COMPANY 2 - Apple ***
      company = await db.Company.create({
        name: 'Apple',
      });
      await db.CompanyAddress.create({
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.company.bsAdjective(),
        address_line_3: faker.company.bsAdjective(),
        address_line_4: faker.company.bsAdjective(),
        town: faker.address.city(),
        county: faker.address.county(),
        country: faker.address.country(),
        post_code: faker.address.zipCode(),
        type_code: Math.floor(Math.random() * 3) + 1,
        company_id: company.id,
      });
      await db.CompanyPhoneNumber.create({
        phone: faker.phone.phoneNumber(),
        type_code: Math.floor(Math.random() * 3) + 1,
        company_id: company.id,
      });

      for (let i = 0; i < 200; i++) {
        db.Company.create({
          name: faker.company.companyName(),
        }).then(() => {
          if (i === 199) {
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
