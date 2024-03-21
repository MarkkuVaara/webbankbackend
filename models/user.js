
const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class User extends Model {};

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usernumber: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  firstname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  middlename: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postnumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  city: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  homebank: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

module.exports = User;
