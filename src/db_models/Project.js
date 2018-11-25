export default (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE',
    },
  });

  Project.associate = models => {
    Project.belongsTo(models.User);
    Project.belongsTo(models.Company);
  };

  return Project;
};
