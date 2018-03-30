export default (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'Sales',
    {
      SaleID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      SaleDate: {
        allowNull: false,
        type: DataTypes.DATE
      },
      CompanyName: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      ProductName: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      ProductSKU: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      SalesValue: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      SalesCount: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  )

  return Sales
}
