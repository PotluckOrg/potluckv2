const router = require("express").Router();
const { Item, Contract, ContractAssociations } = require("../db/models");

router.get('/', (req, res, next) => {
    Contract.findAll()
    .then(contracts => {res.json(contracts)})
    .catch(next);
});

router.post('/', (req, res, next) => {
    Contract.create(req.body.contractAddress)
    .then(newContract => {
        ContractAssociations.bulkCreate([{
            contractId: newContract.id,
            userId: req.body.currentUserId
        },
        {
            contractId: newContract.id,
            userId: req.body.soliciteeId
        }])
        return newContract
    })
    .then(newContract => {
        res.json(newContract)
    })
    .catch(next)
})

module.exports = router;