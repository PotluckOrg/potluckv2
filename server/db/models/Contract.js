const Sequelize = require('sequelize')
const db = require('../db')

const Contract = db.define('Contract', {
  contractAddress: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Contract
