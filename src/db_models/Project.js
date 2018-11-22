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
    Project.belongsTo(models.User, {
      foreignKey: 'project_creator_uuid:',
    });
    Project.belongsTo(models.Company, {
      foreignKey: 'company_uuid:',
    });
  };

  return Project;
};
