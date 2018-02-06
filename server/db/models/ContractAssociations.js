const Sequelize = require('sequelize')
const db = require('../db')

const ContractAssociations = db.define('contractAssociation', {
  itemId: {
    type: Sequelize.INTEGER
  },
  comment: {
    type: Sequelize.STRING
  }
})



module.exports = ContractAssociations
