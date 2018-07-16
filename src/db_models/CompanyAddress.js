export default (sequelize, DataTypes) => {
  const CompanyAddress = sequelize.define('CompanyAddress', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

  CompanyAddress.associate = models => {
    CompanyAddress.belongsTo(models.Company);
  };

  return CompanyAddress;
};
