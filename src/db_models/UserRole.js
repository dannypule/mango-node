export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    code: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(200),
    },
  })

  // UserRole.associate = models => {
  //   UserRole.hasMany(models.User, {
  //     foreignKey: 'code',
  //   })
  // }

  return UserRole
}
