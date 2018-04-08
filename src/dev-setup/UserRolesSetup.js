import db from '../models'

export default async syncForce => {
  // ==================================================================
  // Create UsersRoles table
  // `force: true` will drop the table if it already exists
  // ========
  try {
    await db.UserRoles.sync({ force: syncForce })
    console.log('UserRoles table created.')
    if (!syncForce) return

    // Table created, now create the roles
    const roles = [
      {
        id: 1,
        description: 'Normal User',
      },
      {
        id: 4,
        description: 'Admin User',
      },
      {
        id: 10,
        description: 'Super Admin User',
      },
    ]

    roles.forEach(async role => {
      await db.UserRoles.create({
        RoleID: role.id,
        RoleDescription: role.description,
      })
      console.log(`Role ${role.id} inserted into UserRoles table.`)
    })
  } catch (err) {
    console.log('Unable to perform action ', err)
  }
}
