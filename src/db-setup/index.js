import db from '../db-models'
import UserSetup from './UserSetup'
import UserRoleSetup from './UserRoleSetup'
import ProjectSetup from './ProjectSetup'
import CompanySetup from './CompanySetup'

/*
* This script will create new tables and insert demo data
*/

// ///////////////////////// WARNING ///////////////////////////
// // Using `const freshData = true` will nuke any existing tables and all their data so use with extreme caution
// /////////////////////////////////////////////////////////////

const performSync = async () => {
  const freshData = true // should usually be `false`
  await db.sequelize.sync({ force: freshData }) // Using `const freshData = true` will nuke any existing tables and all their data so use with extreme caution
  if (!freshData) return
  await UserRoleSetup() // Create UsersRole table
  await UserSetup() // Create User table
  await CompanySetup() // Create UsersRole table
  await ProjectSetup() // Create UsersRole table})
}
performSync()
