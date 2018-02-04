const User = require('./User')
const Item = require('./Item')
const Contract = require('./Contract')
const ContractAssociations = require('./ContractAssociations')
const Message = require('./Message')
const MessageAssociations = require('./MessageAssociations')

// Associations
Item.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Item, {foreignKey: 'userId'})
User.belongsToMany(Contract, {through: ContractAssociations })
Contract.belongsToMany(User, {through: ContractAssociations })
Message.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Message, {foreignKey: 'userId'})
// User.belongsToMany(Message, {through: MessageAssociations })
// Message.belongsToMany(User, {through: MessageAssociations })

module.exports = {
  User,
  Item,
  Contract,
  ContractAssociations,
  Message,
  MessageAssociations
}
