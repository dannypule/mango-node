export default (sequelize, DataTypes) => {
  const UserProject = sequelize.define('UserProject', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
      defaultValue: 'ACTIVE',
    },
    access_type: {
      allowNull: false,
      type: DataTypes.ENUM('FULL', 'EDITOR', 'VIEWER'),
      defaultValue: 'VIEWER',
    },
  });

  UserProject.associate = models => {
    UserProject.belongsTo(models.User);
    UserProject.belongsTo(models.Project);
  };

  return UserProject;
};
