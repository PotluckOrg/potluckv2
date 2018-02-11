

const router = require("express").Router();
const { Item, Contract, ContractAssociations } = require("../db/models");

let contractAddress = 10000000

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
  // contractAddress++

    Contract.create({contractAddress})
    .then(newContract => {
      return newContract.update({contractAddress: newContract.id})
    })
    .then(contract => {
        ContractAssociations.bulkCreate([{
            contractId: contract.id,
            userId: req.body.currentUserId,
            itemIds: req.body.itemIds
        },
        {
            contractId: contract.id,
            userId: req.body.soliciteeId
        }])
        return contract
    })
    .then(contract => {
        console.log("New Contract: ", contract)
        res.json(contract)
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
