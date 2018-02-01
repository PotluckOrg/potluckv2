const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const net = require('net');
const config = require('config');
const compiledContract = require('./contracts/contractv1');
const morgan = require('morgan')
const path = require('path')

const app = express();

// logging middleware
app.use(morgan('dev'))


// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

//config
// const ipcAddr = config.get('ipcAddr');
const ipcAddr = "/Users/natalieung/blockchaintest/privEth/geth.ipc"
// const configPort = config.get('port');
const configPort = 4001


// api routes
// app.use('/api', require('./server/api'))
app.use('/web3', require('./server/web3'))

// static file serving middleware
app.use(express.static(path.join(__dirname, 'public')))

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })



const port = process.env.PORT || configPort || 4000;
app.listen(port, function() { console.log('Example app listening on port ' + port); });
