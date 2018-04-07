// import bcrypt from 'bcrypt'
import config from '../config'
import jwt from 'jsonwebtoken'

export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      UserID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      FirstName: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      LastName: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      Email: {
        allowNull: true,
        type: DataTypes.STRING(50),
        unique: true,
      },
      Username: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true,
      },
      Password: {
        allowNull: false,
        type: DataTypes.STRING(150),
      },
      DateCreated: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      DateUpdated: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      RoleID: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      updatedAt: 'DateUpdated',
      createdAt: 'DateCreated',
      classMethods: {
        associate(models) {
          // associations can be defined here
          Users.hasMany(models.UserToken, {
            foreignKey: 'UserID',
          })
          Users.belongsTo(models.UserRole, {
            foreignKey: 'RoleID',
          })
        },
      },
      hooks: {
        // beforeCreate: (user: any, options: any, next: any) => {
        //   const saltFactor = 6;
        //   // Only hash the password if it has been modified or is new
        //   if (user.get('Password') !== null) {
        //     // generate a salt
        //     bcrypt
        //       .genSalt(saltFactor)
        //       // hash the password along with our new salt
        //       .then(salt => bcrypt.hash(user.Password, salt, null))
        //       // override the plain password with the hashed one
        //       .then(hash => {
        //         user.set('Password', hash);
        //         debugger;
        //         next(user);
        //       })
        //       .catch(next);
        //   } else next();
        // },
        // afterCreate: async (user: any, options: any) => {
        //   const { transaction } = options;
        //   // Save password in password history
        //   if (user.changed('Password') && user.get('Password') !== null) {
        //     try {
        //       await user.createUserPassword(
        //         {
        //           Password: user.Password,
        //         },
        //         {
        //           transaction,
        //         }
        //       );
        //     } catch (err) {
        //       throw err;
        //     }
        //   }
        // },
        // beforeUpdate: (user: any, options: any, next: any) => {
        //   const saltFactor = 6;
        //   // Only hash the password if it has been modified or is new
        //   if (user.changed('Password') && user.get('Password') !== null) {
        //     // generate a salt
        //     bcrypt
        //       .genSalt(saltFactor)
        //       // hash the password along with our new salt
        //       .then(salt => bcrypt.hash(user.Password, salt, null))
        //       // override the plain password with the hashed one
        //       .then(hash => {
        //         user.Password = hash;
        //         next();
        //       })
        //       .catch(next);
        //   } else next();
        // },
        // afterUpdate: async (user: any, options: any) => {
        //   const { transaction } = options;
        //   // Save password in password history
        //   if (user.changed('Password') && user.get('Password') !== null) {
        //     try {
        //       await user.createUserPassword(
        //         {
        //           Password: user.Password,
        //         },
        //         {
        //           transaction,
        //         }
        //       );
        //     } catch (err) {
        //       throw err;
        //     }
        //   }
        // },
      },
    },
  )

  Users.prototype.getJWT = user => {
    const expirationTime = parseInt(config.jwt_expiration, 10)
    const token = jwt.sign({ userID: user.UserID }, config.jwt_encryption, {
      expiresIn: expirationTime,
    })
    return `Bearer ${token}`
  }

  return Users
}
