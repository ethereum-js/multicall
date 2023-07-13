import { Provider } from "ethers";
import ABI from "./abi";
import Ethers from "./ethers";
import { CallOptions, CallData, MulticalSetup, ExecuteData } from "./types";
import { getContractAddressFromChainId } from "./utils";

export class Multicall {
  private _setup: MulticalSetup
  constructor(setup: MulticalSetup) {
    if (!setup.provider) {
      throw Error("Provider is required")
    }
    this._setup = setup
  }

  public async call(contractsCallData: CallData[], callOptions: CallOptions = {}) {
    const executeData: ExecuteData[] = []
    for (let callDataIndex = 0; callDataIndex < contractsCallData.length; callDataIndex++) {
      const callData = contractsCallData[callDataIndex]
      const iface = Ethers.getInterface(callData.abi)

      executeData.push({
        callData: iface.encodeFunctionData(callData.method, callData.parameters),
        target: callData.contractAddress,
        outputTypes: Ethers.getOutput(callData.abi, callData.method)
      })
    }
    return this.execute(executeData, callOptions)
  }

  private async execute(executeData: ExecuteData[], callOptions: CallOptions) {
    let response
    if (Ethers.isV5) {
      response = await this.executeEtherV5(executeData, callOptions)
    } else {
      response =  await this.executeEtherV6(executeData, callOptions)
    }
    const results: any[] = []
    response.returnData.forEach((result: { success: boolean, returnData: any }, index: number) => {
      if (result.success) {
        if (executeData[index].outputTypes) {
          const decoded = Ethers.abiDecode(executeData[index].outputTypes, result.returnData)
          const data = decoded.length === 1 ? decoded[0] : decoded
          results.push(data)
        } else {
          results.push(result.returnData)
        }
      } else {
        results.push(null)
      }
    });

    return {
      blockNumber: parseInt(`${response.blockNumber}`),
      results,
    }
  }

  private async executeEtherV5(executeData: ExecuteData[], callOptions: CallOptions) {
    const provider = this._setup.provider
    let contractMulticallAddress = this._setup.contractMulticall
    if (!contractMulticallAddress) {
      const network = await provider.getNetwork()
      contractMulticallAddress = getContractAddressFromChainId(parseInt(`${network.chainId}`))
    }
    const contract = new Ethers.v5.Contract(contractMulticallAddress, ABI.Multicall, provider as any)
    let options = {}

    if (callOptions.blockNumber) {
      options = {
        ...options,
        blockTag: parseInt(`${callOptions.blockNumber}`)
      }
    }
    const response = await contract.callStatic.tryBlockAndAggregate(false, executeData.map(ele => ({
      target: ele.target,
      callData: ele.callData,
    })), options)
    return response
  }

  private async executeEtherV6(executeData: ExecuteData[], callOptions: CallOptions) {
    const provider = (this._setup.provider as Provider)
    let contractMulticallAddress = this._setup.contractMulticall
    if (!contractMulticallAddress) {
      const network = await provider.getNetwork()
      contractMulticallAddress = getContractAddressFromChainId(parseInt(`${network.chainId}`))
    }
    const contract = new Ethers.v6.Contract(contractMulticallAddress, ABI.Multicall, { provider })
    let options = {}

    if (callOptions.blockNumber) {
      options = {
        ...options,
        blockTag: parseInt(`${callOptions.blockNumber}`)
      }
    }
    const response = await contract.tryBlockAndAggregate.staticCall(false, executeData.map(ele => ({
      target: ele.target,
      callData: ele.callData,
    })), options)
    return response
  }
}