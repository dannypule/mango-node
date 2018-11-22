import colors from 'colors/safe';
import faker from 'faker';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: users, count: usersCount } = await db.User.findAndCountAll();

      for (let i = 0; i < 200; i++) {
        db.UserAddress.create({
          address_line_1: faker.address.streetAddress(),
          address_line_2: faker.company.bsAdjective(),
          address_line_3: faker.company.bsAdjective(),
          address_line_4: faker.company.bsAdjective(),
          town: faker.address.city(),
          county: faker.address.county(),
          country: faker.address.country(),
          post_code: faker.address.zipCode(),
          type_code: Math.floor(Math.random() * 3) + 1,
          user_uuid: users[Math.floor(Math.random() * (usersCount - 1))].uuid,
        }).then(() => {
          if (i === 199) {
            console.log(colors.green('Demo items inserted into UserAddress table.'));
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
