# Potluck

[Potluck alpha online](http://potluck.market)

An app for reducing food waste on a local scale through bartering via Solidity smart contracts and blockchain technology.


## Introduction

Did you buy more eggs than you can use? Have a bumper crop of zucchini? Going out of town soon and won't finish all of your bananas before you leave? Potluck provides an easy way to redirect food that might otherwise go to waste.

Users join personal networks derived from existing physical communities such as a workplace, apartment building, community center or university, and can see items that other users in that network are offering. Users can list unwanted food items that still have remaining life for trade in their "pantry," and see what others have listed in the 'market' view. When a user (source) requests an item or items from another user's (target) pantry, a Solidity smart contract instance is created. The target user can update that contract by requesting items from the source's pantry in return, decline their request, or simply give their items away.

Once both parties agree to a trade, they exchange items and then confirm in the app that the trade took place. At this point the contract is completed and both users now receive Potluck Points, which over time accumulate and attest to their reliability.

## Built With

This project was created over a two-week sprint with a team of four collaborators using:
* [Node.js](https://nodejs.org/en/)
* [Solidity](http://solidity.readthedocs.io/en/latest/) - implementation of our smart contract
* [Web3](https://web3js.readthedocs.io/en/1.0/) - interaction between our app and our smart contracts & Ethereum nodes
* [Express](https://expressjs.com/)
* [Webpack](https://webpack.js.org/)
* [Postgres](https://www.postgresql.org/)/[Sequelize](http://docs.sequelizejs.com/) - for organizing our users and their respective items
* [React](https://reactjs.org/)-[Redux](https://redux.js.org/)
* HTML & CSS


## Implementation

At the heart of this project are smart contracts written in the Solidity language (created by Ethereum to interact with the Ethereum Virtual Machine, influenced by C++, Python and JavaScript).

We began by defining the contract itself and building an Express server that includes Web3 to communicate with our contracts. We created two simulated Ethereum nodes using Geth with which to test our transactions. Each node is associated with a user and needs to be running and mining in order to interact with a smart contract instance. We also constructed a Postgres database using Sequelize to keep track of our users' account information and pantry items, and built out a robust yet straightforward user interface using React-Redux.

An integral part of our interface is the Inbox component, within which users can see the existing trades with which they are associated. When a new trade is initiated it appears in the target user's Inbox under "New Requests." When they click on a new request, they will then see all in the same view both the items requested of them as well as the source user's pantry which they can browse and add items to request for their own side of the trade. They also have the options to accept or decline the request outright. All of these options will update the applicable smart contract instance. React-Redux was indispensable in creating this "Request Ticket" view, combining several existing modular components, managing the staging of items to request from users and updating the view state whenever an update occurs.
