const router = require("express").Router();
const { Item, Contract, ContractAssociations } = require("../db/models");

router.get('/', (req, res, next) => {
    Contract.findAll()
    .then(contracts => {res.json(contracts)})
    .catch(next);
});

router.post('/', (req, res, next) => {
  const contractAddress = req.body.contractAddress
    Contract.create({contractAddress})
    .then(newContract => {
        ContractAssociations.bulkCreate([{
            contractId: newContract.id,
            userId: req.body.currentUserId
        },
        {
            contractId: newContract.id,
            userId: req.body.soliciteeId
        }], {individualHooks: true})
        return newContract
    })
    .then(newContract => {
        console.log("New Contract: ", newContract)
        res.json(newContract)
    })
    .catch(err => console.log(err))
})

module.exports = router;
