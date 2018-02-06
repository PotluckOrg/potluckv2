const router = require('express').Router()
const geth = require('geth-private')
const { User } = require('../db/models')

let gethInstances = [] //keeping track of running insts
let ipcAddresses = [] //keeping track of running nodes
let coinbases = [] //for replacing outdated account data in the db with newly created accounts
let currentNode //to set apart the current user's working node

router.post('/geth-start-script', (req, res, next) => {
  //check to see if the node is running
  if (ipcAddresses === [] || !ipcAddresses.includes(req.body.user.ipcAddr)) {//declaring node geth instance
    let inst = geth({
      verbose: true, //for console log
      gethOptions: {
      datadir: `./nodeDir/${req.body.user.username}`,
      networkid: 5,
      port: req.body.user.port + 1,
      rpcport: req.body.user.rpcport + 1,
      nodiscover: false,
      maxpeers: 100
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
    console.log(`Adding ${req.body.user.username} to peer network.`)
    //peers will not be added if only one node is running
    if (gethInstances.length > 1) {
      for (let i = 0; i < gethInstances.length - 1; i++){
        for (let j = 0; j < coinbases.length; j++){
          gethInstances[i].inst.consoleExec(`admin.addPeer(${coinbases[j]})`)
        }
      }
    }
  })
  .then( function () {
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

      let index = ipcAddresses.indexOf(req.body.user.ipcAddr)
      gethInstances.splice(index, 1)
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
router.get('/check-peers/:user', (req, res, next) => {
  if (ipcAddresses.includes(req.body.user.ipcAddr))
  {
     currentNode = gethInstances.find(node => node.ipcAddr === req.body.user.ipcAddr)
    currentNode.inst.consoleExec('net.peerCount')
    .then(peers => {
      console.log(`This node has ${peers} peers.`)
    })
  }
  res.json("Testing peers")
})

module.exports = {router, currentUser}
