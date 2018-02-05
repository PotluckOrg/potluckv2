const router = require('express').Router()
const { Message } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
    Message.findAll()
    .then(messages => res.json(messages))
    .catch(next)
})


router.get('/:recipientId', (req, res, next) => {
  Message.findAll({
      where: {
          recipientUserId: req.params.recipientId
      }
  })
    .then(messages => res.json(messages))
    .catch(next)
})


router.post('/', (req, res, next) => {
  Message.create(req.body)
    .then(message => res.status(201).json(message))
    .catch(next)
})


router.delete('/:id', (req, res, next) => {
  Message.findById(req.params.id)
    .then(message => message.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})

