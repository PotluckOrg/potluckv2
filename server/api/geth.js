const router = require('express').Router()
module.exports = router
const geth = require('geth-private')
const { User } = require('../db/models')

let gethInstances = []
let ipcAddresses = []
let currentNode

router.post('/geth-start-script', (req, res, next) => {
  if (ipcAddresses === [] || !ipcAddresses.includes(req.body.user.ipcAddr)) {

    //declaring node geth instance
    let inst = geth({
      verbose: true,
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
    console.log(`${req.body.user.username} getting enode info...`)
    return currentNode.inst.consoleExec('admin.nodeInfo.enode')
  })
  .then(enode => {
    //will not work with enodes when network is les than 2 people
    console.log(`Adding ${req.body.user.username} to peer network.`)
    if (gethInstances.length > 1) {
      for (let i = 0; i < gethInstances.length - 1; i++){
        gethInstances[i].inst.consoleExec(`admin.addPeer(${enode})`)
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

router.post('/geth-stop-script', (req, res, next) => {
  if (ipcAddresses.includes(req.body.user.ipcAddr))
    {
    currentNode = gethInstances.find(node => node.ipcAddr === req.body.user.ipcAddr)
    console.log("Stopping mining...")
    currentNode.inst.consoleExec('miner.stop()')
    .then(function() {
      currentNode.inst.stop()
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
