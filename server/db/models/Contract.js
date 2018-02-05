const Sequelize = require('sequelize')
const db = require('../db')

const Contract = db.define('contract', {
  contractAddress: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('Created', 'FirstReview', 'SecondReview', 'Pending', 'Canceled', 'Completed'),
    defaultValue: 'Created'
  }
})


// Created: User 1 has deployed a contract SOLIDITY
// FirstReview: User 2 opens the trade request, sends it back to User 1
// SecondReview: User 1 opens the trade request and sees what User 2 wants
// Pending: User 1 has reviewed the terms and agrees- clicks on a button confirming the contract SOLIDITY
// Canceled: Either user denies the trade- clicks a button saying deny SOLIDITY
// Completed: Both users have met in person and exchanged their foods and clicked a button saying they got their foods SOLIDITY

module.exports = Contract
