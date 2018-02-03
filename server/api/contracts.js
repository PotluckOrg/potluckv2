const router = require("express").Router();
const { Item, Contract, ContractAssociations } = require("../db/models");

router.get('/', (req, res, next) => {
    Contract.findAll()
    .then(contracts => {res.json(contracts)})
    .catch(next);
});

module.exports = router;