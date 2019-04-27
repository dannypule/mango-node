export default (sequelize, DataTypes) => {
  const CompanyAddress = sequelize.define('CompanyAddress', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    address_line_1: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    address_line_2: {
      allowNull: true,
      type: DataTypes.STRING(100)
    },
    address_line_3: {
      allowNull: true,
      type: DataTypes.STRING(100)
    },
    address_line_4: {
      allowNull: true,
      type: DataTypes.STRING(100)
    },
    town: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    county: {
      allowNull: true,
      type: DataTypes.STRING(100)
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    post_code: {
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

  CompanyAddress.associate = models => {
    CompanyAddress.belongsTo(models.Company);
  };

  return CompanyAddress;
};
