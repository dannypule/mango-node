import * as bcrypt from 'bcrypt';

export default (sequelize: any, DataTypes: any) => {
  const Users = sequelize.define(
    'Users',
    {
      UserID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      First_Name: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      Last_Name: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      Email: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      Username: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      Password: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      Date_Created: {
        allowNull: true,
        type: DataTypes.DATETIME,
      },
      Date_Updated: {
        allowNull: true,
        type: DataTypes.DATETIME,
      },
    },
    {
      freezeTableName: true,
      updatedAt: 'Date_Updated',
      createdAt: 'Date_Created',
      classMethods: {
        associate(models: any) {
          // associations can be defined here
          Users.hasMany(models.UserToken, {
            foreignKey: 'UserID',
          });
          Users.belongsTo(models.UserRole, {
            foreignKey: 'RoleID',
          });
        },
      },
      hooks: {
        beforeUpdate: (user: any, options: any, next: any) => {
          const saltFactor = 8;

          // Only hash the password if it has been modified or is new
          if (user.changed('Password') && user.get('Password') !== null) {
            // generate a salt
            bcrypt
              .genSalt(saltFactor)
              // hash the password along with our new salt
              .then(salt => bcrypt.hash(user.Password, salt, null))
              // override the plain password with the hashed one
              .then(hash => {
                user.Password = hash;
                next();
              })
              .catch(next);
          } else next();
        },
        afterUpdate: async (user: any, options: any) => {
          const { transaction } = options;
          // Save password in password history
          if (user.changed('Password') && user.get('Password') !== null) {
            try {
              await user.createUserPassword(
                {
                  Password: user.Password,
                },
                {
                  transaction,
                }
              );
            } catch (err) {
              throw err;
            }
          }
        },
      },
    }
  );

  return Users;
};
