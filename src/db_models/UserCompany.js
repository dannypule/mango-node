export default (sequelize, DataTypes) => {
  const UserCompany = sequelize.define('UserCompany', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE',
    },
  });

  UserCompany.associate = models => {
    UserCompany.belongsTo(models.User);
    UserCompany.belongsTo(models.Company);
  };

  return UserCompany;
};
