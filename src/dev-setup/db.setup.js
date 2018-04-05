import moment from 'moment'
import faker from 'faker'
import db from '../db-schema'

// ///////////////////////// WARNING ///////////////////////////
// // This script will create new tables and insert demo data
// // Using `force: true` will nuke any existing tables so use with extreme caution
// /////////////////////////////////////////////////////////////

// ==================================================================
// Create Users table
// force: true will drop the table if it already exists
// =================================================
const UsersSync = false
db.Users.sync({ force: UsersSync })
  .then(() => {
    console.log('Users table created.')
  })
  .then(() => {
    if (!UsersSync) return

    // Table created, now create a user
    return db.Users.create({
      FirstName: 'Super',
      LastName: 'Admin',
      Email: 'Super.Admin@fake-email.infoz',
      Username: 'superadmin',
      Password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
      DateCreated: moment().toISOString(),
      DateUpdated: moment().toISOString(),
      RoleID: 10 // super admin role
    })
  })
  .then(() => {
    if (!UsersSync) return

    // Table created, now create a user
    return db.Users.create({
      FirstName: 'Regular',
      LastName: 'Admin',
      Email: 'Admin.Admin@fake-email.infoz',
      Username: 'admin',
      Password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
      DateCreated: moment().toISOString(),
      DateUpdated: moment().toISOString(),
      RoleID: 4 // admin role
    })
  })
  .then(() => {
    if (!UsersSync) return

    console.log('Demo users inserted into Users table.')
  })
  .catch(err => console.log('Unable to perform action ', err))

// ==================================================================
// Create UserRoles table
// force: true will drop the table if it already exists
// =================================================
const UserRolesSync = false
db.UserRoles.sync({ force: UserRolesSync })
  // eslint-disable-next-line
  .then(data => {
    console.log('UserRoles table created.')

    if (!UserRolesSync) return

    // Table created, now create the roles
    const roles = [
      {
        id: 1,
        description: 'Normal User'
      },
      {
        id: 4,
        description: 'Admin User'
      },
      {
        id: 10,
        description: 'Super Admin User'
      }
    ]

    roles.forEach(role => {
      db.UserRoles.create({
        RoleID: role.id,
        RoleDescription: role.description
      })
        .then(() => {
          console.log(`Role ${role.id} user inserted into UserRoles table.`)
        })
        .catch(err => console.log('An error occured ', err))
    })
  })
  .catch(err => console.log('Unable to perform action ', err))

// ==================================================================
// Create UserTokens table
// force: true will drop the table if it already exists
// =================================================
const UserTokensSync = false
db.UserTokens.sync({ force: UserTokensSync })
  .then(() => {
    console.log('UserTokens table created.')
  })
  .catch(err => console.log('Unable to perform action ', err))

// ///////////////////////// WARNING ///////////////////////////
// // This script will create new tables and insert demo data
// // Using `force: true` will nuke any existing tables so use with extreme caution
// /////////////////////////////////////////////////////////////

// ==================================================================
// Create Sales table
// force: true will drop the table if it already exists
// =================================================
const SalesSync = false
db.Sales.sync({ force: SalesSync })
  .then(() => {
    console.log('Sales table created.')
  })
  .then(() => {
    if (!SalesSync) {
      return // Table created, now create sales items
    }

    // create 30 sales items
    // let companyName: string;
    const companies = ['Ribena', 'Coca Cola', 'Evian']
    companies.forEach(companyName => {
      for (let f = 0; f < 15; f++) {
        db.Sales.create({
          SaleDate: moment(faker.date.recent()).toISOString(),
          CompanyName: companyName,
          ProductName: faker.commerce.productName(),
          ProductSKU: faker.random.number({ min: 1234, max: 9876 }),
          SalesValue: faker.finance.amount(100, 2000, 2),
          SalesCount: faker.random.number({ min: 12, max: 98 })
        })
      }
    })
  })
  .then(() => {
    if (!SalesSync) return

    console.log('Demo sales items inserted into Sales table.')
  })
  .catch(err => console.log('Unable to perform action ', err))

// ==================================================================
// Create Cars table
// force: true will drop the table if it already exists
// =================================================
const CarsSync = true
db.Cars.sync({ force: CarsSync })
  .then(() => {
    console.log('Cars table created.')
  })
  .then(() => {
    return db.Cars.create({
      Model: 'Range Rover',
      Year: 2018
    })
  })
  .then(() => {
    console.log('Demo car inserted into Cars table.')
  })
  .catch(err => console.log('Unable to perform action ', err))
