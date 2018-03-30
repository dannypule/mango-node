export default (sequelize, DataTypes) => {
  const UserRoles = sequelize.define(
    'UserRoles',
    {
      RoleID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true
      },
      RoleDescription: {
        allowNull: false,
        type: DataTypes.STRING(100)
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      classMethods: {
        associate(models) {
          // associations can be defined here
          UserRoles.hasMany(models.Users, {
            foreignKey: 'RoleID'
          })
        }
      }
    }
  )

  return UserRoles
}
