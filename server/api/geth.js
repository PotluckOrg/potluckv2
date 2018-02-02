const router = require('express').Router()
module.exports = router
const geth = require('geth-private')
const { User } = require('../db/models')

let gethInstances = []
let ipcAddresses = []
let currentNode

router.get('/geth-start-script/:user', (req, res, next) => {

  if (ipcAddresses === [] || !ipcAddresses.includes(req.params.user.ipcAddr)) {

    //declaring node geth instance
    let inst = geth({
      verbose: true,
      gethOptions: {
      datadir: `./nodeDir/${req.params.user.ipcAddr}`,
      networkid: 5,
      port: req.params.user.port,
      rpcport: req.params.user.rpcport,
      nodiscover: false,
      maxpeers: 100
      }
    })
    //Keeping track of what nodes have geth running for the sake of the other scripts
    gethInstances.push({ipcAddr: req.params.user.ipcAddr, inst: inst})
    ipcAddresses.push(req.params.user.ipcAddr)
  }

  //always get node to start instance from our node array to ensure its not duplicate
  currentNode = gethInstances.find(node => node.ipcAddr === req.params.user.ipcAddr)

  //Starting the Geth instance
  currentNode.inst.start()
  .then(function() {
    console.log(`${req.params.user.name} has started geth.`)
  })
  .then(function() {
    console.log(`${req.params.user.name} getting enode info...`)
    return currentNode.inst.consoleExec('admin.nodeInfo.enode')
  })
  .then(enode => {
    //will not work with enodes when network is les than 2 people
    console.log(`Adding ${req.params.user.name} to peer network.`)
    if (gethInstances.length > 1) {
      for (let i = 0; i < gethInstances.length - 1; i++){
        gethInstances[i].inst.consoleExec(`admin.addPeer(${enode})`)
      }
    }
  })
  .catch(function(err) {
    console.error(err)
  })
  res.json('Geth Script success')
})

router.get('/geth-stop-script/:user', (req, res, next) => {
  if (ipcAddresses.includes(req.params.user.ipcAddr))
    {
       currentNode = gethInstances.find(node => node.ipcAddr === req.params.user.ipcAddr)
    currentNode.inst.stop()
    .then(function() {
      let index = ipcAddresses.indexOf(req.params.user.ipcAddr)
      gethInstances.splice(index, 1)
      ipcAddresses.splice(index, 1)
    })
    .catch(function(err){
      console.error(err)
    })
    console.log(`${req.params.user.name} has closed geth `)
    res.json("all geth has stopped")
    }
    else res.json("No geth instance to close")
})

router.get('/check-peers/:user', (req, res, next) => {
  if (ipcAddresses.includes(req.params.user.ipcAddr))
  {
     currentNode = gethInstances.find(node => node.ipcAddr === req.params.user.ipcAddr)
    currentNode.inst.consoleExec('net.peerCount')
    .then(peers => {
      console.log(`This node has ${peers} peers.`)
    })
  }
  res.json("Testing peers")
})
