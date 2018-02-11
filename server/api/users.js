const router = require('express').Router()
const { User, ContractAssociations } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'nodeAddress' ]
  })
    .then(users => res.json(users))
    .catch(next)
})


router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next)
})

router.get('/complete-trade/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.increment('tradesCompleted', {by: 1})
    }).then(user => {
      res.json(user)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
})

router.put('/make-admin/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => user.update())
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
})

router.put('/remove-admin/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => user.update())
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
})

router.get('/trades/:contractId', (req, res, next) => {
  ContractAssociations.findAll({ where: {contractId: req.params.contractId}, attributes: ['userId'] })
  .then(cAssocRes => {
    return Promise.all([
      User.findById(+cAssocRes[0].userId),
      User.findById(+cAssocRes[1].userId)
    ])
  })
  .then(users => res.json(users))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(updatedUser => res.json(updatedUser))
    .catch(next)
})


router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})
