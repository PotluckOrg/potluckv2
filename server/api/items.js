const router = require("express").Router();
const { Item, User } = require("../db/models");

router.get('/', (req, res, next) => {
    Item.findAll({ include: [ User ] })
      .then(items => res.json(items))
      .catch(next);
  // should eager load/query for userId
});


router.get('/:itemId', (req, res, next) => {
  Item.findById(req.params.itemId, {include: [User]})
    .then(item => {
      if (!item) {
        res.status(404).send()
      } else {
        res.json(item)
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  console.log('REQBODY', req.body)
  Item.create(req.body)
    .then(newItem => res.status(201).json(newItem))
    .catch(next);
})

router.put('/:itemId', (req, res, next) => {
  Item.findById(req.params.itemId)
    .then(item => {
      return item.update(req.body)
    })
    .then(updatedItem => res.json(updatedItem))
    .catch(next)
})

router.delete('/:itemId', (req, res, next) => {
  Item.findById(req.params.id)
    .then(item => {
      return Item.destroy(item)
    })
    .then(deletedItem => res.status(204).json(deletedItem))
    .catch(next)
})


module.exports = router;
