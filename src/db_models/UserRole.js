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
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE',
    },
  });

  // UserRole.associate = models => {
  //   UserRole.hasMany(models.User, {
  //     foreignKey: 'code',
  //   })
  // }

  return UserRole;
};
