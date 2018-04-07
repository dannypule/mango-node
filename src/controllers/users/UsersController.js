// import express from 'express'
import bcrypt from 'bcrypt'
import db from '../../models'
import { formatGetUserResponse } from './UsersService'
import appUtils from '../../utils/appUtils'

const UserController = {}

UserController.getUsers = async (req, res) => {
  db.Users.findAll().then(users => {
    const formattedUsers = users.map(formatGetUserResponse)
    res.send(formattedUsers)
  })
}

UserController.addUser = async (req, res) => {
  const user = req.body

  const saltFactor = 13

  try {
    const salt = await bcrypt.genSalt(saltFactor)
    const hash = await bcrypt.hash(user.Password, salt, null)
    user.Password = hash
    const _user = await db.Users.create(user, { individualHooks: true })
    appUtils.ReS(res, _user) // @todo format user response
  } catch (err) {
    appUtils.ReE(res, err)
  }
}

UserController.deleteUser = (req, res) => {
  db.Users.destroy({
    where: {
      Username: req.body.Username,
    },
  })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}

export default UserController
