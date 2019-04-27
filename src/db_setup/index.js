/*
 *
 * This script will create new tables
 *
 * This script will also insert demo data when `freshMockData` is set to `true`
 *
 */
import colors from 'colors/safe';
import db from '../db_models';

import UserRoleSetup from './UserRole_setup';
import CompanySetup from './Company_setup';
import HealthClubSetup from './HealthClub_setup';
import UserSetup from './User_setup';
import ProjectSetup from './Project_setup';
import UserProjectSetup from './UserProject_setup';
import CompanyAddress from './CompanyAddress_setup';
import CompanyPhoneNumber from './CompanyPhoneNumber_setup';
import UserAddress from './UserAddress_setup';
import UserPhoneNumber from './UserPhoneNumber_setup';

const performSync = async () => {
  // ///////////////////////////////////////////////////////////////////////////////////////
  // WARNING: When `freshMockData` is `true` it will nuke any existing tables and all their data
  // ///////////////////////////////////////////////////////////////////////////////////////
  const freshMockData = true;

  // ///////////////////////////////////////////////////////////////////////////////////////
  // create the tables
  // ///////////////////////////////////////////////////////////////////////////////////////
  await db.sequelize.sync({ force: freshMockData });
  if (!freshMockData) return;

  // ///////////////////////////////////////////////////////////////////////////////////////
  // insert mock data
  // ///////////////////////////////////////////////////////////////////////////////////////
  await UserRoleSetup();
  await CompanySetup();
  await HealthClubSetup();
  await UserSetup();
  await ProjectSetup();
  await UserProjectSetup();
  await CompanyAddress();
  await CompanyPhoneNumber();
  await UserAddress();
  await UserPhoneNumber();

  console.log(colors.green('DB setup complete. Bye!'));
  process.exit(0);
};

performSync();
