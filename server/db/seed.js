const db = require('./db');


const {
  User,
  Item,
  Contract
} = require('./models')



const users = [
  {
    username: "ruthtown",
    password: "password",
    ipcAddr: "../../nodeDir/ruthtown/geth.ipc",
    port: 4001,
    rpcport: 40011,
    email: "ru@ru.com"
  },
  {
    username: "oczane1",
    password: "password",
    ipcAddr: "../../nodeDir/oczane1/geth.ipc",
    port: 4002,
    rpcport: 40021,
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
  }
];



async function seed () {
  await db.sync({force: true})

  const creatingUsers = await Promise.all(users.map(user => User.create(user)))
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const creatingItems = await Promise.all(items.map(item => Item.create(item)))
  console.log(`seeded ${items.length} products`)
  console.log(`seeded successfully`)

  const creatingContracts = await Promise.all(contracts.map(contract => Contract.create(contract)))
  console.log(`seeded ${contracts.length} reviews`)
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
