const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class Message extends Model {};

Message.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    title: {
      type: DataTypes.VARCHAR(50),
      allowNull: false
    },
    message: {
      type: DataTypes.VARCHAR(1000),
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'message'
})

module.exports = Message;
