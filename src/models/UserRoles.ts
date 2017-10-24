export default (sequelize: any, DataTypes: any) => {
  const UserRoles = sequelize.define(
    'UserRoles',
    {
      RoleID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      RoleDescription: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      classMethods: {
        associate(models: any) {
          // associations can be defined here
          UserRoles.hasMany(models.Users, {
            foreignKey: 'RoleID',
          });
        },
      },
    }
  );

  return UserRoles;
};
