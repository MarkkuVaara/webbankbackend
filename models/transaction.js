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
      type: DataTypes.TEXT,
      allowNull: false
    },
    transactioner: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pending: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    target: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reference: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'transaction'
})

module.exports = Transaction;
