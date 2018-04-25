import bcrypt from 'bcrypt'
import db from '../../models'
import utils from '../../utils/utils'

export const formatGetUserResponse = user => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    userRoleCode: user.user_role_code,
    companyId: user.company_id,
  }
}

export const addUser = async (req, res, user) => {
  const formattedUser = {
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    phone: user.phone,
    password: user.password,
    company_id: user.companyId, // todo - remove hard coded
    user_role_code: user.userRoleCode, //
  }

  const saltFactor = 13

  try {
    const salt = await bcrypt.genSalt(saltFactor)
    const hash = await bcrypt.hash(formattedUser.password, salt, null)
    formattedUser.password = hash
    const _user = await db.User.create(formattedUser, { individualHooks: true })
    utils.success(res, _user) // @todo format user response
  } catch (err) {
    utils.error(res, err)
  }
}
