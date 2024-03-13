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
      type: DataTypes.VARCHAR(50),
      allowNull: false
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    balancelimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'account'
  })

module.exports = Account;
