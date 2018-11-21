import colors from 'colors/safe';
import faker from 'faker';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user;

      const { rows: companies, count: companiesCount } = await db.Company.findAndCountAll();

      // *** USER 1 - super admin ***
      user = await db.User.create({
        first_name: 'super',
        last_name: 'admin',
        email: 'super.admin@email.fake',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 110, // super admin role
        verified: true,
        company_id: companies[0].id,
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
        email: 'admin@email.fake',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 100, // admin role
        verified: true,
        company_id: companies[0].id,
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
        email: 'company.admin@email.fake',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 50,
        verified: true,
        company_id: companies[0].id,
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
        email: 'company.editor@email.fake',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 40,
        verified: true,
        company_id: companies[0].id,
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
        email: 'company.viewer@email.fake',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 30,
        verified: true,
        company_id: companies[0].id,
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
        email: 'company.regular@email.fake',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 20,
        verified: true,
        company_id: companies[0].id,
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

      const amount = 400;
      for (let i = 0; i <= amount; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        db.User.create({
          first_name: firstName,
          last_name: lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.fake`,
          password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
          user_role_code: [50, 40, 30, 20][Math.floor(Math.random() * 3)],
          verified: true,
          company_id: companies[Math.floor(Math.random() * (companiesCount - 1))].id,
        }).then(user => {
          console.log(colors.green(user.email));
          if (i === amount) {
            console.log(colors.green('Demo items inserted into User table.'));
            resolve({ companies, companiesCount });
          }
        });
      }
    } catch (err) {
      console.log(colors.red('Unable to perform action', err));
      reject(err);
    }
  });
};
