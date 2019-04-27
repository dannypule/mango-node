export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    code: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(200)
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE'
    },
    created_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE
    }
  });

  return UserRole;
};
