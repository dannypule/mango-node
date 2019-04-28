export default (sequelize, DataTypes) => {
  const HealthClubPhoneNumber = sequelize.define('HealthClubPhoneNumber', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    type_code: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE'
    },
    health_club_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    created_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE
    }
  });

  HealthClubPhoneNumber.associate = models => {
    HealthClubPhoneNumber.belongsTo(models.Company);
  };

  return HealthClubPhoneNumber;
};
