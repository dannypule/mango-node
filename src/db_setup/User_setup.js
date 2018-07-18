import colors from 'colors/safe';
import db from '../db_models';
import faker from 'faker';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user;

      // *** USER 1 - Super Admin ***
      user = await db.User.create({
        first_name: 'Super',
        last_name: 'Admin',
        email: 'Super.Admin@fake-email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 110, // super admin role
      });
      await db.UserPhoneNumber.create({
        phone: faker.phone.phoneNumber(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });
      await db.UserAddress.create({
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.company.bsAdjective(),
        address_line_3: faker.company.bsAdjective(),
        address_line_4: faker.company.bsAdjective(),
        town: faker.address.city(),
        county: faker.address.county(),
        country: faker.address.country(),
        post_code: faker.address.zipCode(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });

      // *** USER 2 - Admin Admin ***
      user = await db.User.create({
        first_name: 'Admin',
        last_name: 'Admin',
        email: 'Admin.Admin@fake-email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 100, // admin role
      });
      await db.UserPhoneNumber.create({
        phone: faker.phone.phoneNumber(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });
      await db.UserAddress.create({
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.company.bsAdjective(),
        address_line_3: faker.company.bsAdjective(),
        address_line_4: faker.company.bsAdjective(),
        town: faker.address.city(),
        county: faker.address.county(),
        country: faker.address.country(),
        post_code: faker.address.zipCode(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });

      // *** USER 3 - Regular User ***
      user = await db.User.create({
        first_name: 'Regular',
        last_name: 'User',
        email: 'Regular.User@fake-email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 40,
      });
      await db.UserPhoneNumber.create({
        phone: faker.phone.phoneNumber(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });
      await db.UserAddress.create({
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.company.bsAdjective(),
        address_line_3: faker.company.bsAdjective(),
        address_line_4: faker.company.bsAdjective(),
        town: faker.address.city(),
        county: faker.address.county(),
        country: faker.address.country(),
        post_code: faker.address.zipCode(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });

      // *** USER 4 - Another User ***
      user = await db.User.create({
        first_name: 'Another',
        last_name: 'User',
        email: 'Another.User@fake-email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 30,
      });
      await db.UserPhoneNumber.create({
        phone: faker.phone.phoneNumber(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });
      await db.UserAddress.create({
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.company.bsAdjective(),
        address_line_3: faker.company.bsAdjective(),
        address_line_4: faker.company.bsAdjective(),
        town: faker.address.city(),
        county: faker.address.county(),
        country: faker.address.country(),
        post_code: faker.address.zipCode(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });

      // *** USER 5 - Some User ***
      user = await db.User.create({
        first_name: 'Some',
        last_name: 'User',
        email: 'Some.User@fake-email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 30,
      });
      await db.UserPhoneNumber.create({
        phone: faker.phone.phoneNumber(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });
      await db.UserAddress.create({
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.company.bsAdjective(),
        address_line_3: faker.company.bsAdjective(),
        address_line_4: faker.company.bsAdjective(),
        town: faker.address.city(),
        county: faker.address.county(),
        country: faker.address.country(),
        post_code: faker.address.zipCode(),
        type_code: Math.floor(Math.random() * 3) + 1,
        user_id: user.id,
      });

      for (let i = 0; i < 400; i++) {
        db.User.create({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
          user_role_code: 30, // regular role
        }).then(() => {
          if (i === 199) {
            console.log(colors.green('Demo items inserted into User table.'));
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
