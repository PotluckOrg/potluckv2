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



module.exports = router;
