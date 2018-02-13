const Sequelize = require('sequelize')
const db = require('../db')

const ContractAssociations = db.define('contractAssociation', {
  itemIds: {
    type: Sequelize.STRING
  },
  comment: {
    type: Sequelize.STRING
  },
  itemReceived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})



module.exports = ContractAssociations
