const router = require('express').Router()

router.use('/items', require('./items'))
router.use('/users', require('./users'))
router.use('/geth', require('./geth'))
router.use('/contracts', require('./contracts'))
router.use('/messages', require('./messages'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
