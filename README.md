# Potluck

An app for reducing food waste on a local scale through bartering via Solidity smart contracts.

## Introduction

Did you buy more eggs than you can use? Have a bumper crop of zucchini? Going out of town soon and won't finish all of your bananas before you leave? Potluck provides an easy way to redirect food that might otherwise go to waste. Define your network, list unwanted items in your 'pantry' and see what others have on offer. Others can request specific items from your pantry via a smart contract, which you can respond to by requesting items from theirs in return, or simply give your items away.

This project was created over a two-week sprint with a team of four collaborators using Node.js, Solidity, Sequelize, Express, React-Redux, HTML & CSS.

## Implementation

At the heart of this project are smart contracts written in the Solidity language (by Ethereum, influenced by C++, Python and JavaScript). Users join personal networks such as their workplace or other physically centralized communities, and can see items that other users in that network are offering. A contract instance is created when a user (source) requests an item or items from another user's (target) 'pantry'. The target user can update that contract by selecting items in turn from the source user's pantry, or denying or accepting outright. Once both parties agree to a trade, they exchange items and then confirm that the trade took place. Both users now receive points, which over time accumulate and attest to their reliability.

We began by defining the contract itself and building an Express server that includes Web3 to communicate with our contracts. We created two simulated Ethereum nodes using Geth with which to test our transactions. Each node is associated with a user and needs to be running and mining in order to interact with a smart contract instance. We also constructed a Postgres database using Sequelize to keep track of our users' account information and pantry items, and built out a robust yet straightforward user interface using React-Redux.
