import colors from 'colors/safe';
import db from '../db_models';

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      let project;

      // *** PROJECT 1 ***
      project = await db.Project.create({
        title: 'May 2018 - Virtual Reality Project',
        project_creator: 3,
        company_id: 1,
      });
      await db.UserProject.create({
        user_id: 3,
        project_id: project.id,
        access_type: 'FULL',
      });
      await db.UserProject.create({
        user_id: 4,
        project_id: project.id,
        access_type: 'EDITOR',
      });
      await db.UserProject.create({
        user_id: 5,
        project_id: project.id,
        access_type: 'VIEWER',
      });

      // *** PROJECT 2 ***
      project = await db.Project.create({
        title: 'April 2019 - China Telecomms Installation Project',
        project_creator: 3,
        company_id: 1,
      });
      await db.UserProject.create({
        user_id: 3,
        project_id: project.id,
        access_type: 'FULL',
      });
      await db.UserProject.create({
        user_id: 4,
        project_id: project.id,
        access_type: 'EDITOR',
      });
      await db.UserProject.create({
        user_id: 5,
        project_id: project.id,
        access_type: 'VIEWER',
      });

      // *** PROJECT 3 ***
      project = await db.Project.create({
        title: 'September 2018 - New iPhone Launch Project',
        project_creator: 3,
        company_id: 1,
      });
      await db.UserProject.create({
        user_id: 3,
        project_id: project.id,
        access_type: 'FULL',
      });
      await db.UserProject.create({
        user_id: 4,
        project_id: project.id,
        access_type: 'EDITOR',
      });
      await db.UserProject.create({
        user_id: 5,
        project_id: project.id,
        access_type: 'VIEWER',
      });

      console.log(colors.green('Demo items inserted into Project table.'));
      resolve();
    } catch (err) {
      console.log(colors.red('Unable to perform action', err));
      reject(err);
    }
  });
};
