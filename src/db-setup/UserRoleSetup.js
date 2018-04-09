import db from '../models'

export default async syncForce => {
  return new Promise(async (resolve, reject) => {
    try {
      // await db.UserRole.sync({ force: syncForce }) // `force: true` will drop the table if it already exists
      // console.log('UserRole table created.')
      if (!syncForce) return resolve()

      // Table created, now create the roles
      const roles = [
        {
          code: 30,
          description: 'Employee User Type 1',
        },
        {
          code: 40,
          description: 'Employee User Type 2',
        },
        {
          code: 100,
          description: 'Admin User',
        },
        {
          code: 107,
          description: 'Super Admin User',
        },
      ]

      roles.forEach(async role => {
        await db.UserRole.create({
          code: role.code,
          description: role.description,
        })
        console.log(`Role ${role.code} inserted into UserRole table.`)
      })

      resolve()
    } catch (err) {
      console.log('Unable to perform action ', err)
      reject(err)
    }
  })
}
