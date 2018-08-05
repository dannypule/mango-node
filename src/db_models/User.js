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
      status: {
        allowNull: false,
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
        defaultValue: 'ACTIVE',
      },
    },
  );

  User.associate = models => {
    User.belongsTo(models.UserRole);
  };

  User.prototype.getJWT = user => {
    const expirationTime = parseInt(config.jwt_expiration, 10);
    const token = jwt.sign({
      userId: user.id,
      userRoleCode: user.user_role_code,
      companyId: user.company_id,
      status: user.status,
    }, config.jwt_encryption, {
      expiresIn: expirationTime,
    });
    return `Bearer ${token}`;
  };

  return User;
};
