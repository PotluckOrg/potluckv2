const router = require("express").Router();
const { ContractAssociations, User, Item } = require("../db/models");

router.get('/:contractId', (req, res, next) => {
    ContractAssociations.findAll({
        where: {contractId: req.params.contractId}
    })
    .then(contractAssociations => {res.json(contractAssociations)})
    .catch(next);
})

router.get('/ledger/:contractId', (req, res, next) => {
    ContractAssociations.findAll({
      where: {
        contractId: req.params.contractId
            },
      attributes: ['userId', 'itemId', 'comment' ]
  })
    .then( assocs => res.status(200).json(assocs))
})



module.exports = router;
