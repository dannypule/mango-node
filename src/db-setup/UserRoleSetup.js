import db from '../db-models'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.UserRole.create({
        code: 30,
        description: 'Employee User Type 1',
      })
      await db.UserRole.create({
        code: 40,
        description: 'Employee User Type 2',
      })
      await db.UserRole.create({
        code: 100,
        description: 'Admin User',
      })
      await db.UserRole.create({
        code: 107,
        description: 'Super Admin User',
      })

      resolve()
    } catch (err) {
      console.log('Unable to perform action ', err)
      reject(err)
    }
  })
}
