export default (sequelize, DataTypes) => {
  const HealthClub = sequelize.define('HealthClub', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(70)
    },
    timezone: {
      allowNull: true,
      type: DataTypes.STRING(40)
    },
    date_format: {
      allowNull: true,
      type: DataTypes.STRING(40)
    },
    time_format: {
      allowNull: true,
      type: DataTypes.STRING(40)
    },
    first_day_of_week: {
      allowNull: false,
      type: DataTypes.ENUM('SUN', 'MON'),
      defaultValue: 'SUN'
    },
    logo: {
      allowNull: true,
      type: DataTypes.BLOB('long')
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE'
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

  // HealthClub.associate = models => { // link to Member model
  //   HealthClub.hasMany(models.Member);
  // };

  return HealthClub;
};
