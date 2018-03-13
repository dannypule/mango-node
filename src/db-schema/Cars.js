export default (sequelize, DataTypes) => {
  const Cars = sequelize.define(
    'Cars',
    {
      CarID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Model: {
        allowNull: false,
        type: DataTypes.STRING(40),
        primaryKey: true,
      },
      Year: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      DateCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      DateUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      createdAt: 'DateCreated',
      updatedAt: 'DateUpdated',
      freezeTableName: true,
      classMethods: {},
    }
  );

  return Cars;
};
