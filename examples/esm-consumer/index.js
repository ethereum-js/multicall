#!/usr/bin/node --experimental-specifier-resolution=node
import { RPCs } from "@dapp-builder/rpcs";
import { ethers } from "ethers";
import { Multicall } from "@ethereum-js/multicall";

const provider = new ethers.JsonRpcProvider(await RPCs.getRPC(56));
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
}]);

console.log(result)