import db from '../db-models'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.UserProject.create({
        user_id: 1,
        project_id: 1,
      })

      await db.UserProject.create({
        user_id: 1,
        project_id: 2,
      })

      await db.UserProject.create({
        user_id: 2,
        project_id: 3,
      })

      console.log('Demo items inserted into UserProject table.')
      resolve()
    } catch (err) {
      console.log('Unable to perform action ', err)
      reject(err)
    }
  })
}
