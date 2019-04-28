import colors from 'colors/safe';
import faker from 'faker';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: healthClubs, count: healthClubsCount } = await db.HealthClub.findAndCountAll();

      healthClubs.forEach(async (healthClub, index) => {
        await db.HealthClubAddress.create({
          address_line_1: faker.address.streetAddress(),
          address_line_2: faker.company.bsAdjective(),
          address_line_3: faker.company.bsAdjective(),
          address_line_4: faker.company.bsAdjective(),
          town: faker.address.city(),
          county: faker.address.county(),
          country: faker.address.country(),
          post_code: faker.address.zipCode(),
          type_code: Math.floor(Math.random() * 3) + 1,
          health_club_uuid: healthClub.uuid
        }).then(() => {
          if (index === healthClubsCount - 1) {
            console.log(colors.green('Demo items inserted into HealthClubAddress table.'));
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
