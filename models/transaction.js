const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class Transaction extends Model {};

Transaction.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    transaction: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    transactiontype: {
      type: DataTypes.VARCHAR(20),
      allowNull: false
    },
    transactioner: {
      type: DataTypes.VARCHAR(50),
      allowNull: false
    },
    pending: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    target: {
      type: DataTypes.VARCHAR(50),
      allowNull: true
    },
    message: {
      type: DataTypes.VARCHAR(500),
      allowNull: true
    },
    reference: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    accountid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'transaction'
})

module.exports = Transaction;
