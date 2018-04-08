import moment from 'moment'
import faker from 'faker'
import db from '../models'
import UsersSetup from './UsersSetup'
import UserRolesSetup from './UserRolesSetup'

// ///////////////////////// WARNING ///////////////////////////
// // This script will create new tables and insert demo data
// // Using `force: true` will nuke any existing tables so use with extreme caution
// /////////////////////////////////////////////////////////////
const sync = true
const UsersSyncForce = sync
const UserRolesSyncForce = sync
const SalesSyncForce = sync
const CarsSyncForce = sync

// ==================================================================
// Create Users table
// force: true will drop the table if it already exists
// ========
UsersSetup(UsersSyncForce)

// ==================================================================
// Create UsersRoles table
// `force: true` will drop the table if it already exists
// ========
UserRolesSetup(UserRolesSyncForce)

// ==================================================================
// Create Sales table
// force: true will drop the table if it already exists
// ========
db.Sales.sync({ force: SalesSyncForce })
  .then(() => {
    console.log('Sales table created.')
  })
  .then(() => {
    if (!SalesSyncForce) {
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
          SalesCount: faker.random.number({ min: 12, max: 98 }),
        })
      }
    })
  })
  .then(() => {
    if (!SalesSyncForce) return

    console.log('Demo sales items inserted into Sales table.')
  })
  .catch(err => console.log('Unable to perform action ', err))

// ==================================================================
// Create Cars table
// force: true will drop the table if it already exists
// ========
db.Cars.sync({ force: CarsSyncForce })
  .then(() => {
    console.log('Cars table created.')
  })
  .then(() => {
    return db.Cars.create({
      Model: 'Range Rover',
      Year: 2018,
    })
  })
  .then(() => {
    console.log('Demo car inserted into Cars table.')
  })
  .catch(err => console.log('Unable to perform action ', err))
