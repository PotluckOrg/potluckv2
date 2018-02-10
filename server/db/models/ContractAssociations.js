const Sequelize = require('sequelize')
const db = require('../db')

const ContractAssociations = db.define('contractAssociation', {
  itemIds: {
    type: Sequelize.STRING
  },
  comment: {
    type: Sequelize.STRING
  }
})



module.exports = ContractAssociations
