import * as moment from 'moment';
import * as faker from 'faker';
import db from '../db-schema';

// console.log(faker.commerce.productName());

/////////////////////////// WARNING ///////////////////////////
//// This script will create new tables and insert demo data
//// Using `force: true` will nuke any existing tables so use with extreme caution
///////////////////////////////////////////////////////////////

// ==================================================================
// Create Users table
// force: true will drop the table if it already exists
// =================================================
db.Users
  // .sync() // or use sync({ force: true }) (this should be used with caution)
  .sync({ force: true })
  .then(() => {
    console.log('Users table created.');
  })
  .then(() => {
    // Table created, now create a user
    return db.Users.create({
      FirstName: 'Super',
      LastName: 'Admin',
      Email: 'Super.Admin@fake-email.infoz',
      Username: 'superadmin',
      Password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
      DateCreated: moment().toISOString(),
      DateUpdated: moment().toISOString(),
      RoleID: 10, // super admin role
    });
  })
  .then(() => {
    // Table created, now create a user
    return db.Users.create({
      FirstName: 'Regular',
      LastName: 'Admin',
      Email: 'Admin.Admin@fake-email.infoz',
      Username: 'admin',
      Password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
      DateCreated: moment().toISOString(),
      DateUpdated: moment().toISOString(),
      RoleID: 4, // admin role
    });
  })
  .then(() => {
    console.log('Demo users inserted into Users table.');
  })
  .catch((err: any) => console.log('Unable to perform action ', err));

// ==================================================================
// Create UserRoles table
// force: true will drop the table if it already exists
// =================================================
db.UserRoles
  .sync() // or use sync({ force: true }) (this should be used with caution)
  // .sync({ force: true })
  .then((data: any) => {
    console.log('UserRoles table created.');
    // Table created, now create the roles
    const roles = [
      {
        id: 1,
        description: 'Normal User',
      },
      {
        id: 4,
        description: 'Admin User',
      },
      {
        id: 10,
        description: 'Super Admin User',
      },
    ];

    roles.forEach(role => {
      db.UserRoles
        .create({
          RoleID: role.id,
          RoleDescription: role.description,
        })
        .then(() => {
          console.log(`Role ${role.id} user inserted into UserRoles table.`);
        })
        .catch((err: any) => console.log('An error occured ', err));
    });
  })
  .catch((err: any) => console.log('Unable to perform action ', err));

// ==================================================================
// Create UserTokens table
// force: true will drop the table if it already exists
// =================================================
db.UserTokens
  .sync() // or use sync({ force: true }) (this should be used with caution)
  // .sync({ force: true })
  .then(() => {
    console.log('UserTokens table created.');
  })
  .catch((err: any) => console.log('Unable to perform action ', err));

/////////////////////////// WARNING ///////////////////////////
//// This script will create new tables and insert demo data
//// Using `force: true` will nuke any existing tables so use with extreme caution
///////////////////////////////////////////////////////////////

// ==================================================================
// Create Sales table
// force: true will drop the table if it already exists
// =================================================
db.Sales
  // .sync() // or use sync({ force: true }) (this should be used with caution)
  .sync({ force: true })
  .then(() => {
    console.log('Sales table created.');
  })
  .then(() => {
    // Table created, now create sales items
    // create 30 sales items
    // let companyName: string;

    ['Ribena', 'Coca Cola', 'Evian'].forEach(companyName => {
      for (let f = 0; f < 15; f++) {
        db.Sales.create({
          SaleDate: moment(faker.date.recent()).toISOString(),
          CompanyName: companyName,
          ProductName: faker.commerce.productName(),
          ProductSKU: faker.random.number({ min: 1234, max: 9876 }),
          SalesValue: faker.finance.amount(100, 2000, 2),
          SalesCount: faker.random.number({ min: 12, max: 98 }),
        });
      }
    });
  })
  .then(() => {
    console.log('Demo sales items inserted into Sales table.');
  })
  .catch((err: any) => console.log('Unable to perform action ', err));
