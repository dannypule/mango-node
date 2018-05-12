import db from '../db_models'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.UserRole.create({
        code: 30,
        description: 'Role Type 1',
      })
      await db.UserRole.create({
        code: 40,
        description: 'Role Type 2',
      })
      await db.UserRole.create({
        code: 100,
        description: 'Admin Role',
      })
      await db.UserRole.create({
        code: 110,
        description: 'Super Admin Role',
      })

      resolve()
    } catch (err) {
      console.log('Unable to perform action ', err)
      reject(err)
    }
  })
}
