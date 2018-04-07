import bcrypt from 'bcrypt'
import db from '../../models'

const AuthController = {}

AuthController.login = async (req, res) => {
  db.Users.findOne({
    where: {
      Username: req.body.username,
    },
  })
    .then(user => {
      bcrypt.compare(req.body.password, user.Password, (err, r) => {
        if (err) {
          res.status(500)
          res.send(err)
          return
        }
        if (r) {
          res.send({ token: user.getJWT(user) })
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
