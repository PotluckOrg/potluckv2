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
      attributes: ['userId', 'itemIds', 'comment' ]
  })
    .then( assocs => {
      newTrade.user1 = {
        id: assocs[0].userId,
        name: 'name',
        itemIds: assocs[0].itemIds.split(", "),
        itemImg: '',
        comments: assocs[0].comment
      }
      newTrade.user2 = {
        id: assocs[1].userId,
        name: 'name',
        itemIds: assocs[1].itemIds.split(", "),
        itemImg: '',
        comments: assocs[1].comment
      }
      return Promise.all([User.findById(assocs[0].userId), User.findById(assocs[1].userId)])
    })
    .then( foundUsers =>
     {
       newTrade.user1.name = foundUsers[0].username
       newTrade.user2.name = foundUsers[1].username
       newTrade.user1.itemImgs = newTrade.user1.itemIds.map(itemId => Item.findById(+itemId))
       newTrade.user2.itemImgs = newTrade.user2.itemIds.map(itemId => Item.findById(+itemId))
       return Promise.all(newTrade.user1.itemImgs)
      })
     .then( foundUser1Items => {
       newTrade.user1.itemImgs = foundUser1Items.map(item => item.iconUrl)

       return Promise.all(newTrade.user2.itemImgs)
     })
     .then( foundUser2Items => {
      newTrade.user2.itemImgs = foundUser2Items.map(item => item.iconUrl)
      console.log("User2  Items: ", newTrade.user2.itemImgs)
      return res.status(200).json(newTrade)
     })
    .catch(next)
})

router.put('/:contractId', (req, res, next) => {
  return ContractAssociations.findOne({where: {
      userId: req.body.soliciteeId
  }})
  .then(contractAssoc => {
    return contractAssoc.update({itemIds: req.body.itemIds})
  })
  .then(updatedCA => {
    console.log("Updated ContractAssociation: ", updatedCA)
    res.json(updatedCA)
  })
  .catch(next)
})


module.exports = router;
