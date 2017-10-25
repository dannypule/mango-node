import * as moment from 'moment';
import db from '../models';

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
    // Table created, now create a user
    return db.Users.create({
      FirstName: 'Super',
      LastName: 'Admin',
      Email: 'Johan.Jones@fake-email.infoz',
      Username: 'superadmin',
      Password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
      DateCreated: moment().toISOString(),
      DateUpdated: moment().toISOString(),
      RoleID: 10, // super admin role
    });
  })
  .then(() => {
    console.log('Demo user inserted into Users table.');
  })
  .catch((err: any) => console.log('Unable to perform action ', err));

// ==================================================================
// Create UserRoles table
// force: true will drop the table if it already exists
// =================================================
db.UserRoles
  // .sync() // or use sync({ force: true }) (this should be used with caution)
  .sync({ force: true })
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
  // .sync() // or use sync({ force: true }) (this should be used with caution)
  .sync({ force: true })
  .then(() => {
    console.log('UserTokens table created.');
  })
  .catch((err: any) => console.log('Unable to perform action ', err));
