import db from '../db-models'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
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
