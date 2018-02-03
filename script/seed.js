const db = require('../server/db');


const {
  User,
  Item,
  Contract,
  ContractAssociations
} = require('../server/db/models')



const users = [
  {
    username: "ruthtown",
    password: "password",
    ipcAddr: "../../nodeDir/ruthtown/geth.ipc",
    port: 4001,
    rpcport: 40011,
    cbAddr: "0x6ba566b156c8323430c4bf29e1d5582d1dba7dcc",
    email: "ru@ru.com"
  },
  {
    username: "oczane1",
    password: "password",
    ipcAddr: "../../nodeDir/oczane1/geth.ipc",
    port: 4002,
    rpcport: 40021,
    cbAddr: "0x2b0a5afa84317e65a9069089cebcefdf0d288d78",
    email: "oczane@web.com"
  }
]

const items = [
  {
    name: '2 sweet potatoes',
    description: "purchased two weeks ago, have been stored properly",
    userId: 1
  },
  {
    name: '7 eggs',
    description: "I needed some eggs for a recipe but I don't eat eggs usually",
    userId: 1
  },
  {
    name: '3 eggplants',
    description: "Garden grown - I have too many eggplants to use myself",
    userId: 1
  },
  {
    name: '5 bananas',
    description: "Going out of town soon and I don't want all these bananas to go to waste!",
    userId: 2
  },
  {
    name: '1 lemon',
    userId: 2
  }
]

const contracts = [
  {
    contractAddress: '0xac4f4D4Ef8CEc4dd5cEEFAc935f414e3E562Aa33'
  },
  {
    contractAddress: '0xgh4f6D4EgH4Ec4dd5cEYHAc932f473e3E312Aa21'
  },
  {
    contractAddress: '0xqr4f4D4Ef8CUm4dy3cEEFAc985f414e3E562Ga49'
  }
];

const contractAssociations = [
  {userId: 1, contractId: 1, item1: '3 bananas', item2: '4 carrots, 1 onion', comment1: 'Soup dejour amor!', comment2: 'This is BANANAS!'},
  {userId: 2, contractId: 1, item1: '3 bananas', item2: '4 carrots, 1 onion', comment1: 'Soup dejour amor!', comment2: 'This is BANANAS!'},
  {userId: 2, contractId: 2, item1: '2 pears', item2: '3 oranges', comment1: 'Soup dejour amor!', comment2: 'This is BANANAS!'},
  {userId: 1, contractId: 2, item1: '3 pears', item2: '3 oranges', comment1: 'Soup dejour amor!', comment2: 'This is BANANAS!'},
  {userId: 2, contractId: 3, item1: '3 bananas', item2: '8 onions, 6 apples', comment1: 'Soup dejour amor!', comment2: 'This is BANANAS!'},
  {userId: 1, contractId: 3, item1: '3 bananas', item2: '8 onions, 6 apples', comment1: 'Soup dejour amor!', comment2: 'This is BANANAS!'}
]



async function seed () {
  await db.sync({force: true})

  const creatingUsers = await Promise.all(users.map(user => User.create(user)))
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const creatingItems = await Promise.all(items.map(item => Item.create(item)))
  console.log(`seeded ${items.length} items`)
  console.log(`seeded successfully`)

  const creatingContracts = await Promise.all(contracts.map(contract => Contract.create(contract)))
  console.log(`seeded ${contracts.length} contracts`)
  console.log(`seeded successfully`)

  const creatingContractAssociations = await Promise.all(contractAssociations.map(contractAssociation => ContractAssociations.create(contractAssociation)))
  console.log(`seeded ${contracts.length} contract associations`)
  console.log(`seeded successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
