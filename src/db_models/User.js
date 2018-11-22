export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      allowNull: true,
      type: DataTypes.STRING(100),
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING(100),
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING(100),
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    verified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE',
    },
  });

  User.associate = models => {
    User.belongsTo(models.UserRole);
  };

  return User;
};
