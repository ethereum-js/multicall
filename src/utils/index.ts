import { Networks } from "../network";

export const getContractAddressFromChainId = (chainId: number) => {
  switch (chainId) {
    case Networks.mainnet:
    case Networks.ropsten:
    case Networks.rinkeby:
    case Networks.goerli:
    case Networks.optimism:
    case Networks.kovan:
    case Networks.matic:
    case Networks.kovanOptimism:
    case Networks.xdai:
    case Networks.goerliOptimism:
    case Networks.arbitrum:
    case Networks.rinkebyArbitrum:
    case Networks.goerliArbitrum:
    case Networks.mumbai:
    case Networks.sepolia:
    case Networks.avalancheMainnet:
    case Networks.avalancheFuji:
    case Networks.fantomTestnet:
    case Networks.fantom:
    case Networks.bsc:
    case Networks.bsc_testnet:
    case Networks.moonbeam:
    case Networks.moonriver:
    case Networks.moonbaseAlphaTestnet:
    case Networks.harmony:
    case Networks.cronos:
    case Networks.fuse:
    case Networks.songbirdCanaryNetwork:
    case Networks.costonTestnet:
    case Networks.boba:
    case Networks.aurora:
    case Networks.astar:
    case Networks.okc:
    case Networks.heco:
    case Networks.metis:
    case Networks.rsk:
    case Networks.rskTestnet:
    case Networks.evmos:
    case Networks.evmosTestnet:
    case Networks.thundercore:
    case Networks.thundercoreTestnet:
    case Networks.oasis:
    case Networks.celo:
    case Networks.godwoken:
    case Networks.godwokentestnet:
    case Networks.klatyn:
    case Networks.milkomeda:
    case Networks.kcc:
    case Networks.lineaTestnet:
      return '0xcA11bde05977b3631167028862bE2a173976CA11';
    case Networks.etherlite:
      return '0x21681750D7ddCB8d1240eD47338dC984f94AF2aC';
    default:
      throw new Error(
        `Chain ${chainId} doesn't have a multicall contract address`
      );
  }
}