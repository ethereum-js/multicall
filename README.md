[![npm version](https://badge.fury.io/js/@ethereum-js%2Fmulticall.svg)](https://www.npmjs.com/package/@ethereum-js/multicall)
![downloads](https://img.shields.io/npm/dw/@ethereum-js/multicall)

# @ethereum-js/multicall

@ethereum-js/multicall is a lightweight library for interacting with the [`Multicall3`](https://github.com/mds1/multicall) smart contract using both ethers v5 and v6.


## Installation

### npm:

```js
$ npm install @ethereum-js/multicall
```

### yarn:

```js
$ yarn add @ethereum-js/multicall
```

## Example

### ESM

```typescript
import { RPCs } from "@dapp-builder/rpcs"
import { ethers } from "ethers"
import { Multicall } from "..";

(async () => {
  const provider = new ethers.JsonRpcProvider(await RPCs.getRPC(56))

  const multicall = new Multicall({
    provider: provider,
  });

  const result = await multicall.call([{
    abi: [{
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    }],
    contractAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    method: 'decimals',
    parameters: []
  }])

  console.log(result)
})()
```

### CJS

```js
const { Multicall } = require("@ethereum-js/multicall");
const { JsonRpcProvider } = require("ethers");
const { RPCs } = require("@dapp-builder/rpcs");
(async () => {
  const provider = new JsonRpcProvider(await RPCs.getRPC(56));

  const multicall = new Multicall({
    provider,
  });

  const result = await multicall.call([
    {
      abi: [
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ],
      contractAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      method: "decimals",
      parameters: [],
    },
  ]);

  console.log(result)
})();

```

## Supports

The below networks are supported by default.

| Chain                   | Chain ID   |
| ----------------------- | ---------- |
| Mainnet                 | 1          |
| Kovan                   | 3          |
| Rinkeby                 | 4          |
| Görli                   | 5          |
| Ropsten                 | 10         |
| Sepolia                 | 42         |
| Optimism                | 137        |
| Optimism Kovan          | 69         |
| Optimism Görli          | 100        |
| Arbitrum                | 420        |
| Arbitrum Görli          | 42161      |
| Arbitrum Rinkeby        | 421611     |
| Polygon                 | 421613     |
| Mumbai                  | 80001      |
| Gnosis Chain (xDai)     | 11155111   |
| Avalanche               | 43114      |
| Avalanche Fuji          | 43113      |
| Fantom Testnet          | 4002       |
| Fantom Opera            | 250        |
| BNB Smart Chain         | 56         |
| BNB Smart Chain Testnet | 97         |
| Moonbeam                | 1284       |
| Moonriver               | 1285       |
| Moonbase Alpha Testnet  | 1287       |
| Harmony                 | 1666600000 |
| Cronos                  | 25         |
| Fuse                    | 122        |
| Songbird Canary Network | 19         |
| Coston Testnet          | 16         |
| Boba                    | 288        |
| Aurora                  | 1313161554 |
| Astar                   | 592        |
| OKC                     | 66         |
| Heco Chain              | 128        |
| Metis                   | 1088       |
| RSK                     | 30         |
| RSK Testnet             | 31         |
| Evmos                   | 9001       |
| Evmos Testnet           | 9000       |
| Thundercore             | 108        |
| Thundercore Testnet     | 18         |
| Oasis                   | 26863      |
| Celo                    | 42220      |
| Godwoken                | 71402      |
| Godwoken Testnet        | 71401      |
| Klatyn                  | 8217       |
| Milkomeda               | 2001       |
| KCC                     | 321        |
| Etherlite               | 111        |
| Linea Testnet		        | 59140      |


## Issues

Please raise any issues in the below link.

https://github.com/ethereum-js/multicall/issues

## Social Network

### Github
https://github.com/ethereum-js

### Discord
Coming soon

### Telegram
Coming soon
