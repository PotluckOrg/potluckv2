const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  messageBody: {
    type: Sequelize.TEXT,
    allowNull: false
  }, 
  recipientUserId: {
      type: Sequelize.INTEGER,
      allowNull: false
  }

})

module.exports = Message
