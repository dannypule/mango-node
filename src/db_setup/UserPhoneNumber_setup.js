import db from '../db_models'
import faker from 'faker'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < 200; i++) {
        db.UserPhoneNumber.create({
          phone: faker.phone.phoneNumber(),
          type_code: Math.floor(Math.random() * 3) + 1,
          user_id: Math.floor(Math.random() * 200) + 1,
        })
      }

      console.log('Demo items inserted into UserPhoneNumber table.')
      resolve()
    } catch (err) {
      console.log('Unable to perform action ', err)
      reject(err)
    }
  })
}
