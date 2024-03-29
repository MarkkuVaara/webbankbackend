const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class Account extends Model {};

Account.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    creationdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    balancelimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'account'
  })

module.exports = Account;
