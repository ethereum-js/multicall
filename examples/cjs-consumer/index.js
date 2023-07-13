(async () => {
  const { Multicall } = require("@ethereum-js/multicall");
  const { JsonRpcProvider } = require("ethers");
  const { RPCs } = require("@dapp-builder/rpcs");

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
