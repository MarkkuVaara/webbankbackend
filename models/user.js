
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
    allowNull: false
  },
  password: {
    type: DataTypes.VARCHAR(100),
    allowNull: false
  },
  firstname: {
    type: DataTypes.VARCHAR(20),
    allowNull: false
  },
  middlename: {
    type: DataTypes.VARCHAR(20),
    allowNull: false
  },
  lastname: {
    type: DataTypes.VARCHAR(50),
    allowNull: false
  },
  address: {
    type: DataTypes.VARCHAR(50),
    allowNull: false
  },
  postnumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  city: {
    type: DataTypes.VARCHAR(50),
    allowNull: false
  },
  email: {
    type: DataTypes.VARCHAR(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.VARCHAR(50),
    allowNull: false
  },
  homebank: {
    type: DataTypes.VARCHAR(50),
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

module.exports = User;
