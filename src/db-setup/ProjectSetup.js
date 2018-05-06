import db from '../db-models'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Project.create({
        title: 'New Mobile App Project',
        project_owner: 1,
        company_id: 1,
      })

      await db.Project.create({
        title: 'Marketing Project',
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
