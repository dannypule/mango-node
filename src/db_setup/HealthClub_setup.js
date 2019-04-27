import colors from 'colors/safe';
import faker from 'faker';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      let healthClub;

      // *** Health Club 1 - Amazon Health Club ***
      healthClub = await db.HealthClub.create({
        name: 'Amazon Health Club',
        timezone: 'demo timezone',
        date_format: 'demo date format',
        time_format: 'demo time format',
        first_day_of_week: 'SUN'
      });
      // await db.HealthClubAddress.create({
      //   address_line_1: faker.address.streetAddress(),
      //   address_line_2: faker.company.bsAdjective(),
      //   address_line_3: faker.company.bsAdjective(),
      //   address_line_4: faker.company.bsAdjective(),
      //   town: faker.address.city(),
      //   county: faker.address.county(),
      //   country: faker.address.country(),
      //   post_code: faker.address.zipCode(),
      //   type_code: Math.floor(Math.random() * 3) + 1,
      //   company_uuid: healthClub.uuid
      // });
      // await db.HealthClubPhoneNumber.create({
      //   phone: faker.phone.phoneNumber(),
      //   type_code: Math.floor(Math.random() * 3) + 1,
      //   company_uuid: healthClub.uuid
      // });

      // *** Health Club 2 - Apple Health Club ***
      healthClub = await db.HealthClub.create({
        name: 'Apple Health Club',
        timezone: 'demo timezone',
        date_format: 'demo date format',
        time_format: 'demo time format',
        first_day_of_week: 'SUN'
      });
      // await db.HealthClubAddress.create({
      //   address_line_1: faker.address.streetAddress(),
      //   address_line_2: faker.company.bsAdjective(),
      //   address_line_3: faker.company.bsAdjective(),
      //   address_line_4: faker.company.bsAdjective(),
      //   town: faker.address.city(),
      //   county: faker.address.county(),
      //   country: faker.address.country(),
      //   post_code: faker.address.zipCode(),
      //   type_code: Math.floor(Math.random() * 3) + 1,
      //   company_uuid: healthClub.uuid
      // });
      // await db.HealthClubPhoneNumber.create({
      //   phone: faker.phone.phoneNumber(),
      //   type_code: Math.floor(Math.random() * 3) + 1,
      //   company_uuid: healthClub.uuid
      // });

      for (let i = 0; i < 200; i++) {
        db.HealthClub.create({
          name: `${faker.company.companyName()} Health Club`,
          timezone: 'demo timezone',
          date_format: 'demo date format',
          time_format: 'demo time format',
          first_day_of_week: 'SUN'
        }).then(() => {
          if (i === 199) {
            console.log(colors.green('Demo items inserted into Health Club table.'));
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
