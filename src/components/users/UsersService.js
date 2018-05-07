import bcrypt from 'bcrypt'
import db from '../../db-models'
import utils from '../../utils'
import { validateUser } from '../../validation-models/User.validation'

export const formatGetUserResponse = user => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    userRoleCode: user.user_role_code,
    companyId: user.company_id,
  }
}

export const formatUserForDb = user => {
  return {
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    password: user.password,
    company_id: user.companyId,
    user_role_code: user.userRoleCode,
  }
}

export const addUser = async (req, res, user) => {
  try {
    await validateUser(req, res, user)

    const formatted = formatUserForDb(user)

    const saltFactor = 13

    const salt = await bcrypt.genSalt(saltFactor)
    const hash = await bcrypt.hash(formatted.password, salt, null)
    formatted.password = hash
    const _user = await db.User.create(formatted, { individualHooks: true })
    utils.success(res, formatGetUserResponse(_user))
  } catch (err) {
    utils.fail(res, err)
  }
}
