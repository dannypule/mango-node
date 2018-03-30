import bcrypt from 'bcrypt'
import db from '../../db-schema'

const AuthController = {}

AuthController.login = async (req, res) => {
  db.Users.findOne({
    where: {
      Username: req.body.username
    }
  })
    .then(user => {
      bcrypt.compare(req.body.password, user.Password, (err, r) => {
        if (err) {
          res.status(500)
          res.send(err)
          return
        }
        if (r) {
          db.UserTokens.create(
            {
              Token: 'some-token',
              UserID: user.UserID,
              ExpiryDatetime: '2017-11-30 22:25:17.449'
            },
            { individualHooks: true }
          )
            .then(userToken => {
              res.send(userToken)
            })
            .catch(err => {
              res.status(500)
              res.send(err)
            })
        } else {
          res.status(500)
          res.send({ status: `Couldn't log in` })
        }
      })
    })
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}

export default AuthController
