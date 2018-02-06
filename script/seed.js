const db = require('../server/db');


const {
  User,
  Item,
  Contract,
  ContractAssociations,
  Message
} = require('../server/db/models')



const users = [
  {
    username: "ruthtown",
    password: "password",
    ipcAddr: "../../nodeDir/ruthtown",
    port: 4001,
    rpcport: 40011,
    cbAddr: "0x9cbaacc29f0aeeff4fb928ce24307fb6c4301b14",
    email: "ru@ru.com",
    tradesCompleted: 3
  },
  {
    username: "oczane1",
    password: "password",
    ipcAddr: "../../nodeDir/oczane1",
    port: 4002,
    rpcport: 40021,
    cbAddr: "0xa0e3b0c17cd1dcf0467809aaa4d8828b088eb4ac",
    email: "oczane@web.com",
    tradesCompleted: 8
  },
  {
    username: "ooong",
    password: "password",
    ipcAddr: "../../nodeDir/ooong",
    port: 4003,
    rpcport: 40031,
    email: "oong@gh.com",
    tradesCompleted: 0
  },
  {
    username: "lwyatt",
    password: "password",
    ipcAddr: "../../nodeDir/lwyatt",
    port: 4004,
    rpcport: 40041,
    email: "lwyatt@net.com",
    tradesCompleted: 22
  },
  {
    username: "nat",
    password: "password",
    ipcAddr: "../../nodeDir/nat",
    port: 4005,
    rpcport: 40051,
    cbAddr: "0x7e69a04d3059ea7df7e13dafcde46906b463294a",
    email: "nat@nat.com",
    tradesCompleted: 3
  },
  {
    username: "nat2",
    password: "password",
    ipcAddr: "../../nodeDir/nat2",
    port: 4006,
    rpcport: 40061,
    cbAddr: "0xd583c533a103eb4459fca932d6bc717d6a05fb40",
    email: "nat2@nat.com",
    tradesCompleted: 2
  }
]

const items = [
  {
    name: '2 sweet potatoes',
    description: "purchased two weeks ago, have been stored properly",
    userId: 1,
    iconUrl: './icons/swtpotato.svg'
  },
  {
    name: '7 eggs',
    description: "I needed some eggs for a recipe but I don't eat eggs usually. They're two and a half weeks old.",
    userId: 1,
    iconUrl: './icons/eggs.svg'
  },
  {
    name: '1 eggplant',
    description: "I overestimated how many eggplants I would need to make eggplant parmesan",
    userId: 2,
    iconUrl: './icons/eggplant.svg'
  },
  {
    name: '5 bananas',
    description: "Going out of town soon and I don't want all these bananas to go to waste!",
    userId: 2,
    iconUrl: './icons/banana.svg'
  },
  {
    name: '1 lemon',
    userId: 2,
    iconUrl: './icons/lemon.svg'
  },
  {
    name: 'Half a pound of edible-pod peas',
    description: "From my garden, picked four days ago",
    userId: 3,
    iconUrl: './icons/peapod.svg'
  },
  {
    name: '4 zucchinis',
    description: "My zucchini plants are going crazy this year",
    userId: 3,
    iconUrl: './icons/zucchini.svg'
  },
  {
    name: '1 ginger root',
    description: "I used part of it for a recipe and I don't have any use for the rest of it",
    userId: 3,
    iconUrl: './icons/ginger.svg'
  },
  {
    name: '2 oranges',
    description: "",
    userId: 4,
    iconUrl: './icons/orange.svg'
  },
  {
    name: '1 jar homemade strawberry jam',
    description: "From a batch of jam I made last week",
    userId: 4,
    iconUrl: './icons/foodbunch2.svg'
  },
  {
    name: '1/2 carton heavy cream',
    description: "Used half of this carton to make whipped cream, but I don't need the rest",
    userId: 4,
    iconUrl: './icons/milk.svg'
  }
]

const contracts = [
  {
    contractAddress: '0xac4f4D4Ef8CEc4dd5cEEFAc935f414e3E562Aa33',
    status: 'Completed'
  },
  {
    contractAddress: '0xgh4f6D4EgH4Ec4dd5cEYHAc932f473e3E312Aa21',
    status: 'Completed'
  },
  {
    contractAddress: '0xqr4f4D4Ef8CUm4dy3cEEFAc985f414e3E562Ga49',
    status: 'Completed'
  },
  {
    contractAddress: '0xgh4TESTEgH4Ec4dd5cEYHAc932f473e3E312Aa22',
    status: 'FirstReview'
  },
  {
    contractAddress: '0xqr4f4D4Ef8TESTdy3cEEFAc985f414e3E562Ga49',
    status: 'SecondReview'
  },
  {
    contractAddress: '0xac4f4D4Ef8TESTdd5cEEFAc935f414e3E562Aa33',
    status: 'Pending'
  },
  {
    contractAddress: '0xac4f4D4Ef8TESTdd5cEEFAc9TEST14e3E562Aa33',
    status: 'Completed'
  },
  {
    contractAddress: '0xac4f4D4Ef8TESTdd5cEEFAc9TEST14e3ETESTa33',
    status: 'Canceled'
  }
];

// comment is about the user - written by the other person involved in the contract
const contractAssociations = [
  {userId: 1, contractId: 1, itemId: 1, comment: 'Soup dejour amor!'},
  {userId: 2, contractId: 1, itemId: 2, comment: 'This is BANANAS!'},
  {userId: 2, contractId: 2, itemId: 3, comment: 'Good stuff!'},
  {userId: 3, contractId: 2, itemId: 4, comment: 'yum oranges!'},
  {userId: 3, contractId: 3, itemId: 5, comment: 'Soup dejour amor!'},
  {userId: 2, contractId: 3, itemId: 6, comment: 'delish!'},
  {userId: 5, contractId: 6, itemId: 7, comment: 'great experience!'},
  {userId: 6, contractId: 6, itemId: 8, comment: 'very delicious!'},
  {userId: 6, contractId: 7, itemId: 9, comment: 'amazing!'},
  {userId: 5, contractId: 7, itemId: 10, comment: 'thank you, love the veggies!'}
]

const messages = [
  {
    subject: 'A time to exchange our produce!',
    messageBody: 'Hi Ruth! I should be geting to campus around 9- I can meet up to swap either before class starts or during lunch!',
    recipientUserId: 1
  },
  {
    subject: 'During lunch?',
    messageBody: 'Hi Oczane! I have to do some resume editing before class starts tomorrow- are you free during lunch to swap? Also I have a great kale recipe to share with you!',
    recipientUserId: 2
  },
  {
    subject: 'Greetings from the 25th floor!',
    messageBody: 'Hi there! When are you free to exchange groceries? You can find me on the 25th floor or I can come to the 11th floor or meet in the lobby',
    recipientUserId: 3
  }
];


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

  const creatingMessages = await Promise.all(messages.map(message => Message.create(message)))
  console.log(`seeded ${messages.length} messages`)
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
