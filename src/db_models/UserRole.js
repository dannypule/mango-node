export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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

  return UserRole;
};
