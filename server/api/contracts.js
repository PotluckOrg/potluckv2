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
        // const newAssocs = req.body.items.map(singleItem => {
        //   return {
        //     contractId: newContract.id,
        //     userId: singleItem.userId,
        //     itemId: singleItem.id
        //   }
        // })
        // console.log("newAssocs: ", newAssocs)
        // ContractAssociations.bulkCreate(newAssocs)
        ContractAssociations.bulkCreate([{
            contractId: newContract.id,
            userId: req.body.currentUserId,
            itemId: req.body.items[0].id
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

module.exports = router;
