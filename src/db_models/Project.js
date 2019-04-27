export default (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE'
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    company_uuid: {
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

  Project.associate = models => {
    Project.belongsTo(models.User);
    Project.belongsTo(models.Company);
  };

  return Project;
};
