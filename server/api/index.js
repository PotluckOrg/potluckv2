const router = require('express').Router()

router.use('/items', require('./items'))
router.use('/users', require('./users'))
router.use('/basket', require('./basket'))
router.use('/geth', require('./geth'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
