const Web3 = require('web3');
const net = require('net');
// const config = require('config');
const compiledContract = require('../../contracts/contractv1.json');
const router = require('express').Router()

module.exports = router


//config
// const ipcAddr = config.get('ipcAddr');
const ipcAddr = "../../node1/geth.ipc"
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

var helpers = require('handlebars-helpers');
var comparison = helpers.comparison();

router.get('/', (req, res) => res.render('home'));

router.post('/', (req, res) => {
  const item = req.body.item;
  web3.eth.personal.unlockAccount(coinbaseAddress, coinbasePassphrase, function(err, uares) {
    ProduceSwapContract.deploy({data: byteCode, arguments: [item]}).send({from: coinbaseAddress, gas: 2000000})
      .on('receipt', function (receipt) {
        console.log("Contract Address: " + receipt.contractAddress);
        res.redirect('/questions?address=' + receipt.contractAddress);
      });
  });
});

router.get('/questions', function(req, res) {
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
      res.render('question', data);
    });
  }
  else {
    res.status(404).send("No question with that address.");
  }
});

router.post('/questions', function(req, res) {
  const contractAddress = req.query.address;
  console.log(req.body);
  const returnedItemRequest = req.body.item;
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
          res.redirect('/questions?address=' + contractAddress);
        }
      );
    });
  }
});
