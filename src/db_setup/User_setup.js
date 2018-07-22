import colors from 'colors/safe';
import db from '../db_models';
import faker from 'faker';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user;

      // *** USER 1 - super admin ***
      user = await db.User.create({
        first_name: 'super',
        last_name: 'admin',
        email: 'super.admin@email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 110, // super admin role
        company_id: 1,
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

      // *** USER 2 - admin ***
      user = await db.User.create({
        first_name: 'admin',
        last_name: 'admin',
        email: 'admin@email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 100, // admin role
        company_id: 1,
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

      // *** USER 3 - company admin ***
      user = await db.User.create({
        first_name: 'company',
        last_name: 'admin',
        email: 'company.admin@email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 50,
        company_id: 1,
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

      // *** USER 4 - company editor ***
      user = await db.User.create({
        first_name: 'company',
        last_name: 'editor',
        email: 'company.editor@email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 40,
        company_id: 1,
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

      // *** USER 5 - company viewer ***
      user = await db.User.create({
        first_name: 'company',
        last_name: 'viewer',
        email: 'company.viewer@email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 30,
        company_id: 1,
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

      // *** USER 6 - company regular ***
      user = await db.User.create({
        first_name: 'company',
        last_name: 'regular',
        email: 'company.regular@email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 20,
        company_id: 1,
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
          user_role_code: [50, 40, 30, 20][Math.floor(Math.random() * 3)],
          company_id: 2,
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
