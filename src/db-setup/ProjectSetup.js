import db from '../db-models'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Project.create({
        title: 'May 2018 - Virtual Reality Project',
        project_owner: 1,
        company_id: 1,
      })

      await db.Project.create({
        title: 'April 2019 - China Telecomms Installation Project',
        project_owner: 2,
        company_id: 2,
      })

      await db.Project.create({
        title: 'September 2018 - New iPhone Launch Project',
        project_owner: 2,
        company_id: 2,
      })

      console.log('Demo items inserted into Project table.')
      resolve()
    } catch (err) {
      console.log('Unable to perform action ', err)
      reject(err)
    }
  })
}
