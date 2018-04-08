// import express from 'express'
import bcrypt from 'bcrypt'
import db from '../../models'
import { formatGetUserResponse } from './UsersService'
import utils from '../../utils/utils'

const UserController = {}

UserController.getUsers = async (req, res) => {
  db.Users.findAll().then(users => {
    const formattedUsers = users.map(formatGetUserResponse)
    utils.success(res, formattedUsers)
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
    utils.success(res, _user) // @todo format user response
  } catch (err) {
    utils.error(res, err)
  }
}

UserController.deleteUser = (req, res) => {
  db.Users.destroy({
    where: {
      Username: req.body.Username,
    },
  })
    .then(user => {
      utils.success(res, user)
    })
    .catch(err => {
      utils.error(res, err)
    })
}

export default UserController
