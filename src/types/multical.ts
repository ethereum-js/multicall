import { Provider } from "ethers"
import { providers } from "ethers-v5"

export interface MulticalSetup {
  provider: Provider | providers.Provider
  contractMulticall?: string
}

export type CallOptions = {
  blockNumber?: string | number;
}

export interface CallData {
  contractAddress: string
  abi: any[]
  method: string
  parameters: any[]
}

export interface ExecuteData {
  outputTypes: any
  target: string
  callData: string
}