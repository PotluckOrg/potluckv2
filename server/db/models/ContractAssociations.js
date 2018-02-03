const Sequelize = require('sequelize')
const db = require('../db')

const ContractAssociations = db.define('contractAssociation', {
  item1: {
    type: Sequelize.STRING
  },
  item2: {
    type: Sequelize.STRING
  },
  comment1: {
    type: Sequelize.TEXT
  },
  comment2: {
    type: Sequelize.TEXT
  }
})

module.exports = ContractAssociations
