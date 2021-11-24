const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

// User

const Collection = db.define('Collection', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  author: {
    type: DataTypes.STRING,
    require: true,
  },
  image: {
    type: DataTypes.STRING,
    require: true,
  },
  description: {
    type: DataTypes.STRING,
    require: true,
  },
});

Collection.belongsTo(User);
User.hasMany(Collection);

module.exports = Collection;
