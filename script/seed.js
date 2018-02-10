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
    email: "ru@ru.com",
    tradesCompleted: 3
  },
  {
    username: "oczane1",
    password: "password",
    ipcAddr: "../../nodeDir/oczane1",
    port: 4002,
    rpcport: 40021,
    email: "oczane@web.com",
    tradesCompleted: 8
  },
  {
    username: "natalie",
    password: "password",
    ipcAddr: "../../nodeDir/ooong",
    port: 4003,
    rpcport: 40031,
    email: "ooong@gh.com",
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
    username: "jamie42",
    password: "password",
    ipcAddr: "../../nodeDir/jamie42",
    port: 4005,
    rpcport: 40051,
    email: "smurf@smurf.com",
    tradesCompleted: 3
  },
  {
    username: "marc_w",
    password: "password",
    ipcAddr: "../../nodeDir/marc_w",
    port: 4006,
    rpcport: 40061,
    email: "guest@guest.com",
    tradesCompleted: 0
  }
]

const items = [
  {
    id: 1,
    name: '4 Green onions',
    description: "Bought last week and used a few for garnishes, but I don't know what to do with the rest",
    userId: 1,
    iconUrl: './icons/leeks.svg'
  },
  {
    id: 2,
    name: '2 sweet potatoes',
    description: "Purchased two weeks ago, have been stored properly",
    userId: 1,
    iconUrl: './icons/swtpotato.svg'
  },
  {
    id: 3,
    name: '7 eggs',
    description: "I needed some eggs for a recipe but I don't eat eggs usually. They're two and a half weeks old.",
    userId: 1,
    iconUrl: './icons/eggs.svg'
  },
  {
    id: 4,
    name: '3 Granny Smith Apples',
    userId: 1,
    iconUrl: './icons/apple.svg'
  },
  {
    id: 5,
    name: '2 artichokes',
    userId: 1,
    iconUrl: './icons/artichoke.svg'
  },
  {
    id: 6,
    name: '3 small onions',
    userId: 2,
    iconUrl: './icons/onion.svg'
  },
  {
    id: 7,
    name: '4 carrots',
    description: "I just am never going to eat these carrots - about two weeks old",
    userId: 2,
    iconUrl: './icons/carrot.svg'
  },
  {
    id: 8,
    name: '2 Pears',
    userId: 2,
    iconUrl: './icons/pear.svg'
  },
  {
    id: 9,
    name: '1 eggplant',
    description: "I overestimated how many eggplants I would need to make eggplant parmesan",
    userId: 2,
    iconUrl: './icons/eggplant.svg'
  },
  {
    id: 10,
    name: '5 bananas',
    description: "Going out of town soon and I don't want all these bananas to go to waste!",
    userId: 2,
    iconUrl: './icons/banana.svg'
  },
  {
    id: 11,
    name: 'Several jalapenos',
    userId: 3,
    iconUrl: './icons/chili.svg'
  },
  {
    id: 12,
    name: '1 lemon',
    description: "A perfectly good lemon, leftover from a cocktail party last Friday",
    userId: 3,
    iconUrl: './icons/lemon.svg'
  },
  {
    id: 13,
    name: 'Swiss cheese',
    userId: 3,
    iconUrl: './icons/cheese.svg'
  },
  {
    id: 14,
    name: 'Half a pound of edible-pod peas',
    description: "From my garden, picked four days ago",
    userId: 3,
    iconUrl: './icons/peapod.svg'
  },
  {
    id: 15,
    name: '1 yellow pepper',
    userId: 3,
    iconUrl: './icons/pepperY.svg'
  },
  {
    id: 16,
    name: '4 zucchinis',
    description: "My zucchini plants are going crazy this year",
    userId: 3,
    iconUrl: './icons/zucchini.svg'
  },
  {
    id: 17,
    name: '3 tomatoes',
    description: "I never seem to use all my tomatoes",
    userId: 4,
    iconUrl: './icons/tomato.svg'
  },
  {
    id: 18,
    name: '1 ginger root',
    description: "I used part of it for a recipe and I don't have any use for the rest of it",
    userId: 4,
    iconUrl: './icons/ginger.svg'
  },
  {
    id: 19,
    name: 'Half a bunch of red grapes',
    description: "I bought way too many grapes to use them all",
    userId: 4,
    iconUrl: './icons/grapes.svg'
  },
  {
    id: 20,
    name: '1 green bell pepper',
    description: "Extra, 8 days old",
    userId: 4,
    iconUrl: './icons/pepperG.svg'
  },
  {
    id: 21,
    name: '2 Portabellas',
    userId: 4,
    iconUrl: './icons/mushroom.svg'
  },
  {
    id: 22,
    name: '2 oranges',
    description: "Almost 3 weeks old but they've been refrigerated",
    userId: 5,
    iconUrl: './icons/orange.svg'
  },
  {
    id: 23,
    name: '2 turnips',
    description: "I just have no idea what to do with turnips, a friend gave them to me the other day",
    userId: 5,
    iconUrl: './icons/turnip.svg'
  },
  {
    id: 24,
    name: '1 romaine heart',
    description: "Perfectly good, not very old (3 days)",
    userId: 5,
    iconUrl: './icons/chard.svg'
  },
  {
    id: 25,
    name: 'Broccoli, 1 head',
    description: "Not gonna use it, about 10 days old",
    userId: 6,
    iconUrl: './icons/broccoli.svg'
  },
  {
    id: 26,
    name: '1 jar homemade strawberry jam',
    description: "From a batch of jam I made last week",
    userId: 6,
    iconUrl: './icons/foodbunch2.svg'
  },
  {
    id: 27,
    name: '1/2 carton heavy cream',
    description: "Used half of this carton to make whipped cream, but I don't need the rest",
    userId: 6,
    iconUrl: './icons/milk.svg'
  },
  {
    id: 28,
    name: 'A handful of shiitake mushrooms',
    description: "Didn't use 'em all - a week old",
    userId: 6,
    iconUrl: './icons/mushroom.svg'
  },
  {
    id: 29,
    name: 'Lettuce',
    userId: 6,
    iconUrl: './icons/lettuce.svg'
  },
  {
    id: 30,
    name: '2 carrots',
    userId: 2,
    iconUrl: './icons/carrot.svg'
  },
]

const contracts = [
  {
    contractAddress: '1',
    status: 'Completed'
  },
  {
    contractAddress: '2',
    status: 'Completed'
  },
  {
    contractAddress: '3',
    status: 'Completed'
  },
  {
    contractAddress: '4',
    status: 'Completed'
  },
  {
    contractAddress: '5',
    status: 'Pending'
  },
  {
    contractAddress: '6',
    status: 'Pending'
  },
  {
    contractAddress: '7',
    status: 'SecondReview'
  },
  {
    contractAddress: '8',
    status: 'SecondReview'
  },
  {
    contractAddress: '9',
    status: 'FirstReview'
  },
  {
    contractAddress: '10',
    status: 'FirstReview'
  }
];

// comment is about the user - written by the other person involved in the contract
const contractAssociations = [
  {userId: 1, contractId: 1, itemIds: '5', comment: 'I can always find a use for garlic!'},
  {userId: 2, contractId: 1, itemIds: '8', comment: 'These were very nice'},
  {userId: 4, contractId: 2, itemIds: '21', comment: 'Yum!'},
  {userId: 2, contractId: 2, itemIds: '6, 30', comment: 'Onions are magic'},
  {userId: 3, contractId: 3, itemIds: '13', comment: 'Happy to have these!'},
  {userId: 6, contractId: 3, itemIds: '29', comment: 'Delish!'},
  {userId: 3, contractId: 4, itemIds: '11, 15', comment: 'Very tasty'},
  {userId: 1, contractId: 4, itemIds: '4', comment: 'Great trade!'},
  {userId: 5, contractId: 6, itemIds: '22'},
  {userId: 6, contractId: 6, itemIds: '25'},
  {userId: 5, contractId: 7, itemIds: '23'},
  {userId: 4, contractId: 7, itemIds: '17, 20'},
  {userId: 3, contractId: 8, itemIds: '16'},
  {userId: 2, contractId: 8, itemIds: '9, 10'},
  {userId: 3, contractId: 9},
  {userId: 1, contractId: 9, itemIds: '1, 3'},
  {userId: 5, contractId: 10},
  {userId: 6, contractId: 10, itemIds: '26'}
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
  },
  {
    subject: 'Greetings from the 25th floor!',
    messageBody: 'Hi there! When are you free to exchange groceries? You can find me on the 25th floor or I can come to the 11th floor or meet in the lobby',
    recipientUserId: 4
  },
  {
    subject: 'Greetings from the 25th floor!',
    messageBody: 'Hi there! When are you free to exchange groceries? You can find me on the 25th floor or I can come to the 11th floor or meet in the lobby',
    recipientUserId: 5
  },
  {
    subject: 'Greetings from the 25th floor!',
    messageBody: 'Hi there! When are you free to exchange groceries? You can find me on the 25th floor or I can come to the 11th floor or meet in the lobby',
    recipientUserId: 6
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
