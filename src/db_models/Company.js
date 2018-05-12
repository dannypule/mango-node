export default (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(40),
    },
  })

  Company.associate = models => {
    Company.hasMany(models.User, {
      foreignKey: 'company_id',
    })
  }

  return Company
}
