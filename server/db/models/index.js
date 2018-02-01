const User = require('./User')
const Item = require('./Item')

// Associations
Item.belongsTo(User)
User.hasMany(Item)

module.exports = {
  User,
  Item
}
