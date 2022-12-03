<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

![](https://img.shields.io/badge/Hackathon-blueviolet)

[![Contributors][contributors-shield]][contributors-url]
[![GitHub issues][issues-shield]][issues-url]
[![GitHub forks][forks-shield]][forks-url]
[![GitHub stars][star-shield]][star-url]
[![GitHub license][license-shield]][license-url]


# Table of content

1. Project Description
1. Stack Requirenments/ Technologies
1. Dapp Architecture


## Project Description

Vultrivius is an NFT marketplace for architects to list Architectural designs or blueprints for sale in forms of NFT. Our platform enables creators/architects to list their NFTs in exchange for a royalty fee that will be specified or inputed by the creator.

Buyers can purchase these NFTs in exchnage with the Harmony Native token(ONE) or with our custom token V3T.

### Dapp features or Hack challange

1. NFT marketplace enabling creators to list NFTs and buyers to purchase NFT
1. Staking pool, each user can stake ONE or V3T on our platform within a staking period and the rewards from this period can be used to purchase NFT from Collection listed on our platform. A governace system is used to determined the choice of nft.

## Technologies 

1. Reactjs and recoiljs - frontend library
1. Firebase - database system
1. Solidity - smart contracts on Harmony chain
1. Three.js - for 3D modeling of NFT(buildings)
1. Maticjs sdk
1. Covalent API

## Dapp architecture

Vultrivius works on four smart contracts :

1. A NFT marketplace smart contract - This contract implement the basic logic of our marketplace i.e listing ,purchase or sales of NFT

 *contract Link* -<https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/contracts/vultriviusNftMarketpalce.sol>



2. A staking pool smart contract -an Erc20 contract implement the logic for users to stake,unstake,purchaseNft etc.

 our staking contract implement the *Harmony VRF* , which is used to generate random bytes onchain . The bytes generated is converted to an integer and used to select stakers from the pool.
 
  *contract Link* -<https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/contracts/vultriviusStaking.sol>
  
2. A governace token contract - a governace token is minted 1:1 to each user that staker ONE or V3T in our platform. This token is retrieved or used to unstake amd to vote during governace


 *contract Link* -<https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/contracts/vultriviusGovernce.sol>
 

3. NFT collection Contract


 *contract Link* -<https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/contracts/ArchitectNftCollection.sol>
 
 
Vultrivius implements covalent APIs  :

1. To fetch users transactions on the dapp <https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/src/pages/Profile/transactions.js>
1. To fetch users token balances

### 3d VR  Repo <https://github.com/scapula07/3d-models-vultrivius>
   We use the Three.js engine to load models of architectural designs that can be optionally provided by Creators.

### NFT Cross-Bridge 

A cross-bridge between Ethereum and Polygon chain was implemented using the Maticjs sdk(POS). The contracts for both tokens were mapped using the polygon Token mapper.

User can transfer their NFT item across chain ,from ethereum to polygonm or vice versa.


### Install
```bash
git clone https://github.com/scapula07/Vutrivius-harmony-hack.git
cd Vutrivius-harmony-hack
yarn install

#Get your development server running.
yarn start
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐ if you like this project!


[contributors-shield]: https://img.shields.io/github/contributors/scapula07/Vutrivius-harmony-hack?style=for-the-badge
[contributors-url]: https://github.com/scapula07/Vutrivius-harmony-hack/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/scapula07/Vutrivius-harmony-hack?style=for-the-badge
[issues-url]: https://github.com/scapula07/Vutrivius-harmony-hack/issues
[forks-shield]: https://img.shields.io/github/forks/scapula07/Vutrivius-harmony-hack?style=for-the-badge
[forks-url]: https://github.com/scapula07/Vutrivius-harmony-hack/network
[star-shield]: https://img.shields.io/github/stars/scapula07/Vutrivius-harmony-hack?style=for-the-badge
[star-url]: https://github.com/scapula07/Vutrivius-harmony-hack/stargazers
[license-shield]: https://img.shields.io/github/license/scapula07/Vutrivius-harmony-hack?style=for-the-badge
[license-url]: hhttps://github.com/scapula07/Vutrivius-harmony-hack/blob/master/License


