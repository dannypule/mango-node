export default (sequelize, DataTypes) => {
  const UserAddress = sequelize.define('UserAddress', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    address_line_1: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    address_line_2: {
      allowNull: true,
      type: DataTypes.STRING(100),
    },
    address_line_3: {
      allowNull: true,
      type: DataTypes.STRING(100),
    },
    address_line_4: {
      allowNull: true,
      type: DataTypes.STRING(100),
    },
    town: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    county: {
      allowNull: true,
      type: DataTypes.STRING(100),
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    post_code: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    type_code: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE',
    },
  });

  UserAddress.associate = models => {
    UserAddress.belongsTo(models.User);
  };

  return UserAddress;
};
