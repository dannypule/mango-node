import db from '../db-models'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        first_name: 'Super',
        last_name: 'Admin',
        email: 'Super.Admin@fake-email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 110, // super admin role
        company_id: 1,
      })

      await db.User.create({
        first_name: 'Regular',
        last_name: 'Admin',
        email: 'Admin.Admin@fake-email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 100, // admin role
        company_id: 2,
      })

      await db.User.create({
        first_name: 'Normie',
        last_name: 'McNorm',
        email: 'normie@fake-email.infoz',
        password: '$2a$07$IcYHfXSjnMBS0M9BBEL/6ejBYCpZh7n6Q7Yw3ujSW9TR4pRz0l1.q', // login with the password `supersecure`
        user_role_code: 30, // regular role
        company_id: 1,
      })

      console.log('Demo users inserted into User table.')
      resolve()
    } catch (err) {
      console.log('Unable to perform action ', err)
      reject(err)
    }
  })
}
