// models/document.model.js
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'documents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Document.associate = (models) => {
    Document.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Document;
};
