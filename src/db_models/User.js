// import bcrypt from 'bcrypt'
import config from '../config';
import jwt from 'jsonwebtoken';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      last_name: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(100),
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(150),
      },
    },
    {
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
  );

  User.associate = models => {
    User.belongsTo(models.UserRole);
  };

  User.prototype.getJWT = user => {
    const expirationTime = parseInt(config.jwt_expiration, 10);
    const token = jwt.sign({ userID: user.id }, config.jwt_encryption, {
      expiresIn: expirationTime,
    });
    return `Bearer ${token}`;
  };

  return User;
};
