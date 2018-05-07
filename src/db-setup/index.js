/*
*
* This script will create new tables
*
* This script will also insert demo data when `freshMockData` is set to `true`
*
*/
import db from '../db-models'
import UserSetup from './UserSetup'
import UserRoleSetup from './UserRoleSetup'
import ProjectSetup from './ProjectSetup'
import CompanySetup from './CompanySetup'
import UserProject from './UserProject'

const performSync = async () => {
  // ///////////////////////////////////////////////////////////////////////////////////////
  // WARNING: When `freshMockData` is `true` it will nuke any existing tables and all their data
  //
  // `freshMockData` should usually be `false`
  // ///////////////////////////////////////////////////////////////////////////////////////
  const freshMockData = true

  // ///////////////////////////////////////////////////////////////////////////////////////
  // create the tables
  // ///////////////////////////////////////////////////////////////////////////////////////
  await db.sequelize.sync({ force: freshMockData })
  if (!freshMockData) return

  // ///////////////////////////////////////////////////////////////////////////////////////
  // insert mock data
  // ///////////////////////////////////////////////////////////////////////////////////////
  await UserRoleSetup()
  await CompanySetup()
  await UserSetup()
  await ProjectSetup()
  await UserProject()
}

performSync()
