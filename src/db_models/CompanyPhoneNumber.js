export default (sequelize, DataTypes) => {
  const CompanyPhoneNumber = sequelize.define('CompanyPhoneNumber', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    type_code: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  CompanyPhoneNumber.associate = models => {
    CompanyPhoneNumber.belongsTo(models.Company);
  };

  return CompanyPhoneNumber;
};
