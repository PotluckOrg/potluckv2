const User = require('./User')
const Item = require('./Item')
const Contract = require('./Contract')

// Associations
Item.belongsTo(User)
User.hasMany(Item)
User.belongsTo(Contract)
Contract.hasMany(User)

module.exports = {
  User,
  Item,
  Contract
}
