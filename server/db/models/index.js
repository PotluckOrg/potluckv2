const User = require('./User')
const Item = require('./Item')
const Contract = require('./Contract')
const ContractAssociations = require('./ContractAssociations')

// Associations
Item.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Item, {foreignKey: 'userId'})
User.belongsToMany(Contract, {through: ContractAssociations })
Contract.belongsToMany(User, {through: ContractAssociations })

module.exports = {
  User,
  Item,
  Contract,
  ContractAssociations
}
