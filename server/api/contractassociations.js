const router = require("express").Router();
const { ContractAssociations } = require("../db/models");

router.get('/:contractId', (req, res, next) => {
    console.log('REQ>PARAMS', req.params)
    console.log('REQ>BODY', req.body)
    ContractAssociations.findAll({
        where: {contractId: req.params.contractId}
    })
    .then(contractAssociations => {res.json(contractAssociations)})
    .catch(next);
});

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
