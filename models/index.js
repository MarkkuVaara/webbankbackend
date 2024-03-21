
const User = require('./user');
const Account = require('./account');
const Transaction = require('./transaction');
const Message = require('./message');

User.hasMany(Account);
Account.belongsTo(User);
User.hasMany(Message);
Message.belongsTo(User);
Account.hasMany(Transaction);
Transaction.belongsTo(Account);

User.sync({ alter: true });
Account.sync({ alter: true });
Transaction.sync({ alter: true });
Message.sync({ alter: true });

module.exports = {
  User, Account, Transaction, Message
};
