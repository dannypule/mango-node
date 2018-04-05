export default (sequelize, DataTypes) => {
  const UserTokens = sequelize.define(
    'UserTokens',
    {
      Token: {
        allowNull: false,
        type: DataTypes.STRING(400),
        primaryKey: true
      },
      UserID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      ExpiryDatetime: {
        allowNull: false,
        type: DataTypes.DATE
      },
      LastUsedDatetime: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      createdAt: 'LastUsedDatetime',
      updatedAt: false,
      freezeTableName: true,
      classMethods: {
        associate(models) {
          // associations can be defined here
          UserTokens.belongsTo(models.Users, {
            foreignKey: 'UserID'
          })
        }
      }
    }
  )

  return UserTokens
}
