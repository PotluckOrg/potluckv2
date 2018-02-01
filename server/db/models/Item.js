const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  iconUrl: {
    type: Sequelize.STRING,
    defaultValue: '../../../public/icons/strawberry.svg'
  }
})

module.exports = Item
