const User = require('./User')
const Item = require('./Item')
const Contract = require('./Contract')

// Associations
Item.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Item, {foreignKey: 'userId'})
User.belongsToMany(Contract, {through: 'contractAssociations'})
Contract.belongsToMany(User, {through: 'contractAssociations'})

module.exports = {
  User,
  Item,
  Contract
}
