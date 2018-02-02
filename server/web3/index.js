const Web3 = require('web3');
const net = require('net');
const config = require('config');
const compiledContract = require('/Users/natalieung/potluck/contracts/contractv1.json');
const router = require('express').Router()

module.exports = router


//config
// const ipcAddr = config.get('ipcAddr');
const ipcAddr = "/Users/natalieung/blockchaintest/privEth/geth.ipc"
// const configPort = config.get('port');
const configPort = 4001

//web3 work
let web3 = new Web3(ipcAddr, net);

web3.eth.getCoinbase(function(err, cba) {
  coinbaseAddress = cba;
  console.log(coinbaseAddress);
});

const coinbasePassphrase = 'passphrase';

const byteCode = compiledContract.byteCode;
const ProduceSwapContract = new web3.eth.Contract(compiledContract.abi);

// var helpers = require('handlebars-helpers');
// var comparison = helpers.comparison();

// router.get('/', (req, res) => res.render('home'));

// user requests item- instead of writing '3 potatoes' startSwap button will grab item info and put it into the contract

router.post('/basket', (req, res) => {
  const item = req.body.item;
  web3.eth.personal.unlockAccount(coinbaseAddress, coinbasePassphrase, function(err, uares) {
    ProduceSwapContract.deploy({data: byteCode, arguments: [item]}).send({from: coinbaseAddress, gas: 2000000})
      .on('receipt', function (receipt) {
        console.log("Contract Address: " + receipt.contractAddress);

 // save contract address, user1id, user2id from the item info
      });
  });
});

router.get('/trade', function(req, res) {
  const contractAddress = req.query.address;
  if (web3.utils.isAddress(contractAddress)) {
    ProduceSwapContract.options.address = contractAddress;
    console.log("ProduceSwapContract.methods.state:", ProduceSwapContract.methods.state())
    console.log(contractAddress);
    const info = ProduceSwapContract.methods.getCurrentTrade().call(function(err, currentTradeItems) {
      console.log(err);
      console.log(currentTradeItems);
      const solicitorItemRequest = currentTradeItems['0'];
      const soliciteeItemRequest = currentTradeItems['1'];
      data = {contractAddress: contractAddress, solicitorItemRequest: solicitorItemRequest, soliciteeItemRequest: soliciteeItemRequest};
      console.log(data);
    });
  }
  else {
    res.status(404).send("No question with that address.");
  }
});

router.post('/trade', function(req, res) {
  // const contractAddress = req.query.address;

  // instead of pulling the contract address from the req.body, pull from firebase - findById(contractId)
  
  console.log(req.body);
  const returnedItemRequest = req.body.item;
  // req.body.item is a string that could include multiple items
  console.log(`Requesting Produce at address ${contractAddress} with answer ${returnedItemRequest}`);
  if (web3.utils.isAddress(contractAddress)) {
    console.log('is valid address');
    web3.eth.personal.unlockAccount(coinbaseAddress, coinbasePassphrase, function(err, uares) {
      console.log('account unlocked');
      ProduceSwapContract.options.address = contractAddress;
      ProduceSwapContract.methods.requestItem(returnedItemRequest).send({from: coinbaseAddress, gas: 1000000})
        .on('error', function (error) {
          console.log('Contract creation error:' + error);
        })
        .on('receipt', function (receipt) {
          console.log(`Item with address ${contractAddress} updated.`);
        }
      );
    });
  }
});