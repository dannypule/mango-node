import db from '../models'
import UserSetup from './UserSetup'
import UserRoleSetup from './UserRoleSetup'
import ProjectSetup from './ProjectSetup'
import CompanySetup from './CompanySetup'

/*
* This script will create new tables and insert demo data
*/

// ///////////////////////// WARNING ///////////////////////////
// // Using `const forceSync = true` will nuke any existing tables and all their data so use with extreme caution
// /////////////////////////////////////////////////////////////

const performSync = async () => {
  const forceSync = true // should usually be `false`
  await db.sequelize.sync({ force: forceSync })
  await UserRoleSetup(forceSync) // Create UsersRole table
  await UserSetup(forceSync) // Create User table
  await CompanySetup(forceSync) // Create UsersRole table
  await ProjectSetup(forceSync) // Create UsersRole table})
}
performSync()
