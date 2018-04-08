import moment from 'moment'
import db from '../models'

export default async syncForce => {
  // ==================================================================
  // Create Users table
  // force: true will drop the table if it already exists
  // ========
  try {
    await db.Users.sync({ force: syncForce })
    console.log('Users table created.')

    if (!syncForce) return

    // Table created, now create a user
    await db.Users.create({
      FirstName: 'Super',
      LastName: 'Admin',
      Email: 'Super.Admin@fake-email.infoz',
      Username: 'superadmin',
      Password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
      DateCreated: moment().toISOString(),
      DateUpdated: moment().toISOString(),
      RoleID: 10, // super admin role
    })

    // Create another user
    await db.Users.create({
      FirstName: 'Regular',
      LastName: 'Admin',
      Email: 'Admin.Admin@fake-email.infoz',
      Username: 'admin',
      Password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
      DateCreated: moment().toISOString(),
      DateUpdated: moment().toISOString(),
      RoleID: 4, // admin role
    })

    console.log('Demo users inserted into Users table.')
  } catch (err) {
    console.log('Unable to perform action ', err)
  }
}
