

const router = require("express").Router();
const { Item, Contract, ContractAssociations } = require("../db/models");

router.get('/', (req, res, next) => {
    Contract.findAll()
    .then(contracts => {res.json(contracts)})
    .catch(next);
});

//Get All Contracts that have been completed
router.get('/completed', (req, res, next) => {
  Contract.findAll({where: {status: 'Completed'}})
    .then( contracts => {
      res.status(200).json(contracts)})
    .catch(next)
})

router.post('/', (req, res, next) => {
  const contractAddress = req.body.contractAddress
    Contract.create({contractAddress})
    .then(newContract => {
        ContractAssociations.bulkCreate([{
            contractId: newContract.id,
            userId: req.body.currentUserId,
            itemIds: req.body.itemIds
        },
        {
            contractId: newContract.id,
            userId: req.body.soliciteeId
        }])
        return newContract
    })
    .then(newContract => {
        console.log("New Contract: ", newContract)
        res.json(newContract)
    })
    .catch(err => console.log(err))
})

router.put('/:contractId', (req, res, next) => {
  Contract.findById(req.params.contractId)
  .then(contract => {
    return contract.update({status: req.body.status})
  })
  .then(updatedContract => {
    console.log(`Updated Contract, status should be ${req.body.status}: `, updatedContract)
    res.json(updatedContract)
  })
  .catch(next)
})

module.exports = router;

