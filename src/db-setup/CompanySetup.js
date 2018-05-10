import db from '../db-models'
import faker from 'faker'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Company.create({
        name: 'Google',
      })

      await db.Company.create({
        name: 'Apple',
      })

      for (let i = 0; i < 100; i++) {
        db.Company.create({
          name: faker.company.companyName(),
        })
      }

      console.log('Demo companies inserted into Company table.')
      resolve()
    } catch (err) {
      console.log('Unable to perform action ', err)
      reject()
    }
  })
}
