import colors from 'colors/safe';
import faker from 'faker';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      let project;
      const { rows: users, count: usersCount } = await db.User.findAndCountAll();
      const { rows: companies, count: companiesCount } = await db.Company.findAndCountAll();

      // *** PROJECT 1 ***
      project = await db.Project.create({
        title: 'May 2018 - Virtual Reality - Project',
        project_creator_id: users[2].id,
        company_id: companies[0].id,
      });
      await db.UserProject.create({
        user_id: users[2].id,
        project_id: project.id,
        access_type: 'FULL',
      });
      await db.UserProject.create({
        user_id: users[4].id,
        project_id: project.id,
        access_type: 'EDITOR',
      });
      await db.UserProject.create({
        user_id: users[4].id,
        project_id: project.id,
        access_type: 'VIEWER',
      });

      // *** PROJECT 2 ***
      project = await db.Project.create({
        title: 'April 2019 - China Telecomms Installation - Project',
        project_creator_id: users[2].id,
        company_id: companies[0].id,
      });
      await db.UserProject.create({
        user_id: users[2].id,
        project_id: project.id,
        access_type: 'FULL',
      });
      await db.UserProject.create({
        user_id: users[4].id,
        project_id: project.id,
        access_type: 'EDITOR',
      });
      await db.UserProject.create({
        user_id: users[4].id,
        project_id: project.id,
        access_type: 'VIEWER',
      });

      // *** PROJECT 3 ***
      project = await db.Project.create({
        title: 'September 2018 - New iPhone Launch - Project',
        project_creator_id: users[2].id,
        company_id: companies[0].id,
      });
      await db.UserProject.create({
        user_id: users[2].id,
        project_id: project.id,
        access_type: 'FULL',
      });
      await db.UserProject.create({
        user_id: users[4].id,
        project_id: project.id,
        access_type: 'EDITOR',
      });
      await db.UserProject.create({
        user_id: users[4].id,
        project_id: project.id,
        access_type: 'VIEWER',
      });

      for (let i = 0; i < 200; i++) {
        db.Project.create({
          title: `${faker.commerce.productName()} - Project`,
          project_creator_id: users[Math.floor(Math.random() * (usersCount - 1))].id,
          company_id: companies[Math.floor(Math.random() * (companiesCount - 1))].id,
        }).then(() => {
          if (i === 199) {
            console.log(colors.green('Demo items inserted into Project table.'));
            resolve();
          }
        });
      }
    } catch (err) {
      console.log(colors.red('Unable to perform action', err));
      reject(err);
    }
  });
};
