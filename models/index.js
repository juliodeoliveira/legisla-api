const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa os models
db.User = require('./user.model')(sequelize, Sequelize.DataTypes);
db.Document = require('./document.model')(sequelize, Sequelize.DataTypes);

// Define associações, se houver
if (db.User.associate) db.User.associate(db);
if (db.Document.associate) db.Document.associate(db);

module.exports = db;
