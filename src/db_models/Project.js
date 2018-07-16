export default (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    // Project.belongsToMany(models.User, {
    //   through: 'user_project',
    // })
    Project.belongsTo(models.User, {
      foreignKey: 'project_owner',
    });
    Project.belongsTo(models.Company, {
      foreignKey: 'company_id',
    });
  };

  return Project;
};
