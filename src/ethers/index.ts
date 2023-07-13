import { ethers } from "ethers";
import { ethers as etherV5 } from "ethers-v5";

export default class Ethers {
  static isV5 = !ethers.ZeroAddress
  static v5 = etherV5
  static v6 = ethers
  static getInterface (abi: any[]) {
    let iface: etherV5.utils.Interface | ethers.Interface
    if (this.isV5) {
      iface = new etherV5.utils.Interface(JSON.stringify(abi))
    } else {
      iface = ethers.Interface.from(abi)
    }
    return iface
  }

  static getOutput (abi: any[], method: string) {
    const iface = this.getInterface(abi)

    if (iface.getFunction(method)?.outputs) {
      return iface.getFunction(method)?.outputs
    }
    for (let i = 0; i < abi.length; i++) {
      if (abi[i].name?.trim() === method) {
        return abi[i].outputs;
      }
    }
    return null
  }

  static abiDecode (types: any, data: any) {
    if (this.isV5) {
      return etherV5.utils.defaultAbiCoder.decode(types, data)
    } else{
      return ethers.AbiCoder.defaultAbiCoder().decode(types, data)
    }
  }
}