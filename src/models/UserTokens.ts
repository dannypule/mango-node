export default (sequelize: any, DataTypes: any) => {
  const UserTokens = sequelize.define(
    'UserTokens',
    {
      Token: {
        allowNull: false,
        type: DataTypes.STRING(300),
        primaryKey: true,
      },
      UserID: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ExpiryDatetime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      AuditLastUsedDatetime: {
        allowNull: false,
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      createdAt: 'AuditCreatedAtDatetime',
      updatedAt: false,
      freezeTableName: true,
      classMethods: {
        associate(models: any) {
          // associations can be defined here
          UserTokens.belongsTo(models.Users, {
            foreignKey: 'UserID',
          });
        },
      },
    }
  );

  return UserTokens;
};
