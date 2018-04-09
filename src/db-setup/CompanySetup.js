import db from '../models'

export default async syncForce => {
  return new Promise(async (resolve, reject) => {
    try {
      // await db.Company.sync({ force: syncForce }) // force: true will drop the table if it already exists
      // console.log('Company table created.')

      if (!syncForce) return resolve()

      await db.Company.create({
        name: 'Google',
      })

      await db.Company.create({
        name: 'Apple',
      })

      console.log('Demo companies inserted into Company table.')
      resolve()
    } catch (err) {
      console.log('Unable to perform action ', err)
      reject()
    }
  })
}
