const router = require('express').Router()
const geth = require('geth-private')
const { User } = require('../db/models')

let gethInstances = [] //keeping track of running insts
let ipcAddresses = [] //keeping track of running nodes
let coinbases = [] //for replacing outdated account data in the db with newly created accounts
let enodes = [] //keeping check of all the enodes to add to peers
let currentNode //to set apart the current user's working node

router.post('/geth-start-script', (req, res, next) => {
  //check to see if the node is running
  if (!ipcAddresses.includes(req.body.user.ipcAddr)) {//declaring node geth instance
    let inst = geth({
      balance: 2000,
      verbose: true, //for console log
      gethOptions: {
      datadir: `./nodeDir/${req.body.user.username}`,
      networkid: 800,
      port: req.body.user.port + 1,
      rpcport: req.body.user.rpcport + 1,
      nodiscover: false,
      maxpeers: 100
      },
      genesisBlock: {
        "alloc": {},
        "config": {
          "homesteadBlock": 0,
          "chainID": 72,
          "eip155Block": 0,
          "eip158Block": 0
        },
        "nonce": "0x0000000000000000",
        "difficulty": "0x4000",
        "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "coinbase": "0x0000000000000000000000000000000000000000",
        "timestamp": "0x00",
        "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "gasLimit": "0xffffffff"
      }
    })
    //Keeping track of what nodes have geth running for the sake of the other scripts
    gethInstances.push({ipcAddr: req.body.user.ipcAddr, inst: inst})
    ipcAddresses.push(req.body.user.ipcAddr)
  }

  //always get node to start instance from our node array to ensure its not duplicate
  currentNode = gethInstances.find(node => node.ipcAddr === req.body.user.ipcAddr)

  //Starting the Geth instance
  currentNode.inst.start()
  .then(function() {
    console.log(`${req.body.user.username} has started geth.`)
  })
  .then(function() {
    console.log(`${req.body.user.username} getting Account info...`)
    return currentNode.inst.consoleExec('eth.coinbase')
  })
  .then(coinbase => {
    coinbases.push(coinbase)
    let cbAddr = coinbase.replace(/^"(.*)"$/, '$1')
    //Make sure account in db is the same as the account of the running nodeor web3 will complain
    User.update({cbAddr}, {
      where: {
        id: req.body.user.id
      }
    })
    return currentNode.inst.consoleExec('admin.nodeInfo.enode')
  })
  .then( enode => {
    enodes.push(enode)

    console.log("Starting to mine...")
     currentNode.inst.consoleExec('miner.start()')

  })
  .catch(function(err) {
    console.error(err)
  })
  res.json('Geth Script success')
})


/**
 * Route to close geth Instaces
 */
router.post('/geth-stop-script', (req, res, next) => {
  //check if node is running
  if (ipcAddresses.includes(req.body.user.ipcAddr))
    {
    currentNode = gethInstances.find(node => node.ipcAddr === req.body.user.ipcAddr)
    currentNode.inst.stop()
    .then(function() {

      //eliminate node and its information from all our current arrays
      let index = ipcAddresses.indexOf(req.body.user.ipcAddr)
      gethInstances.splice(index, 1)
      coinbases.splice(index, 1)
      enodes.splice(index, 1)
      ipcAddresses.splice(index, 1)
    })
    .catch(function(err){
      console.error(err)
    })
    console.log(`${req.body.user.username} has closed geth `)
    res.json("all geth has stopped")
    }
    else res.json("No geth instance to close")
})


/**
 * Route to check peers
 */
router.post('/check-peers/', (req, res, next) => {

  if (ipcAddresses.includes(req.body.user.ipcAddr))
  {
     currentNode = gethInstances.find(node => node.ipcAddr === req.body.user.ipcAddr)

     //peers will not be added if only one node is running
    if (gethInstances.length > 1) {
      console.log(`Adding ${req.body.user.username} to peer network.`)
      for (let j = 0; j < enodes.length - 1; j++){
        console.log("ENODES: ", enodes[j])
        let singleEnode = enodes[j]
        currentNode.inst.consoleExec(`admin.addPeer(${singleEnode})`)
      }
    }
  currentNode.inst.consoleExec(`admin.peers`)
  .then( peers => {
    console.log(`${req.body.user.username} has ${peers} peers.`)
  })
  .catch( err => console.log(err))

    // currentNode.inst.consoleExec('admin.peers')
    // .then(peers => {
    //   console.log(`${req.body.user.username} has ${peers} peers.`)
    // })
  }
  res.json("Testing peers")
})

module.exports = router
