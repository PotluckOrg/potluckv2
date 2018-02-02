const router = require('express').Router()
module.exports = router
const geth = require('geth-private')

let nodeInstances = []
let nodeAddresses = []
let currentNode

router.get('/geth-start-script/:node/:port', (req, res, next) => {
  //check if the node is already in our node directory. If it's there, then it must have an instance already running. Else make a new instance and save it to our array.
  if (nodeAddresses === [] || !nodeAddresses.includes(req.params.node)) {

    //declaring node geth instance
    let inst = geth({
      balance: 100,
      verbose: true,
      gethOptions: {
      datadir: `./${req.params.node}`,
      networkid: 5,
      port: req.params.port,
      rpcport: req.params.port + 1,
      nodiscover: false,
      maxpeers: 100
      }
    })
    nodeInstances.push({address: req.params.node, inst: inst})
    nodeAddresses.push(req.params.node)
  }

  //always get node to start instance from our node array to ensure its not duplicate
  currentNode = nodeInstances.find(node => node.address === req.params.node)

  //Starting the Geth instance
  currentNode.inst.start()
  .then(function() {
    console.log(`${req.params.node} has started geth.`)
  })
  .then(function() {
    console.log(`${req.params.node} getting enode info...`)
    return currentNode.inst.consoleExec('admin.nodeInfo.enode')
  })
  .then(enode => {
    //will not work with enodes when network is les than 2 people
    console.log(`Adding ${req.params.node} to peer network.`)
    if(nodeInstances.length > 1) {
      for(let i = 0; i < nodeInstances.length-1; i++){
        nodeInstances[i].inst.consoleExec(`admin.addPeer(${enode})`)
      }
    }
  })
  .catch(function(err) {
    console.error(err)
  })


  res.json('Geth Script success')
})

router.get('/geth-stop-script/:node', (req, res, next) => {
  if (nodeAddresses.includes(req.params.node))
    {
       currentNode = nodeInstances.find(node => node.address === req.params.node)
    currentNode.inst.stop()
    .then(function() {
      let index = nodeInstances.indexOf(req.params.node)
      nodeInstances.splice(index, 1)
      nodeAddresses.splice(index, 1)
    })
    .catch(function(err){
      console.error(err)
    })
    console.log(`${req.params.node} has closed geth `)
    res.json("all geth has stopped")
    }
    else res.json("No geth instance to close")
})

router.get('/check-peers/:node', (req, res, next) => {
  if (nodeAddresses.includes(req.params.node))
  {
     currentNode = nodeInstances.find(node => node.address === req.params.node)
    currentNode.inst.consoleExec('net.peerCount')
    .then(peers => {
      console.log(`This node has ${peers} peers.`)
    })
  }
  res.json("Testing peers")
})
