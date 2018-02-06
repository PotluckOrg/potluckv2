const router = require("express").Router();
const { ContractAssociations, User, Item } = require("../db/models");

router.get('/:contractId', (req, res, next) => {
    ContractAssociations.findAll({
        where: {contractId: req.params.contractId}
    })
    .then(contractAssociations => {res.json(contractAssociations)})
    .catch(next);
})

//Get the user and items associated with a single contract and place them within an object before returning to store
router.get('/ledger/:contractId', (req, res, next) => {
  const newTrade = {}
    ContractAssociations.findAll({
      where: {
        contractId: req.params.contractId
            },
      attributes: ['userId', 'itemId', 'comment' ]
  })
    .then( assocs => {
      newTrade.user1 = {
        id: assocs[0].userId,
        name: 'name',
        itemId: assocs[0].itemId,
        itemName: 'itemName',
        comments: assocs[0].comment
      }
      newTrade.user2 = {
        id: assocs[1].userId,
        name: 'name',
        itemId: assocs[1].itemId,
        itemName: 'itemName',
        comments: assocs[1].comment
      }
      return Promise.all([User.findById(assocs[0].userId), User.findById(assocs[1].userId)])
    })
    .then( foundUsers =>
     {
       newTrade.user1.name = foundUsers[0].username
       newTrade.user2.name = foundUsers[1].username
       return Promise.all([Item.findById(newTrade.user1.itemId), Item.findById(newTrade.user2.itemId)])
     })
     .then( foundItems => {
       newTrade.user1.itemName = foundItems[0].name
       newTrade.user2.itemName = foundItems[1].name
     })
    .then( function () {
      res.status(200).json(newTrade)
    })
    .catch(next)
})



module.exports = router;
