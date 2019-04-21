export default (sequelize, DataTypes) => {
  const UserProject = sequelize.define('UserProject', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE'
    },
    access_type: {
      allowNull: false,
      type: DataTypes.ENUM('FULL', 'EDITOR', 'VIEWER'),
      defaultValue: 'VIEWER'
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    project_uuid: {
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

  UserProject.associate = models => {
    UserProject.belongsTo(models.User);
    UserProject.belongsTo(models.Project);
  };

  return UserProject;
};
