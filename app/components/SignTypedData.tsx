'use client'

import FunctionTile from './functionTile'
import { useSignTypedData } from 'wagmi'
import styles from './functionTile.module.css'

const exampleTypedData = {
  domain: {
    name: 'Example DApp',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    salt: '0xabcdef1234567890000000000000000000000000000000000000000000000000',
  },
  primaryType: 'MyPrimaryType',
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
      { name: 'salt', type: 'bytes32' },
    ],
    MyPrimaryType: [
      { name: 'data', type: 'string' },
      { name: 'amount', type: 'uint256' },
      { name: 'address', type: 'string' },
    ],
  },
  message: {
    data: 'Some data',
    amount: 1000,
    address: '0x48c89d77ae34ae475e4523b25ab01e363dce5a78'
  },
}
export default function SignTypedData() {
  const { signTypedData, status, error, failureReason } = useSignTypedData()
  const sign = () => {
    // @ts-expect-error
    signTypedData(exampleTypedData)
  }
  const signBadData = () => {
    // @ts-expect-error
    signTypedData(exampleTypedData.message)
  }
  return (
    <FunctionTile>
      <FunctionTile.Title>Sign Typed Data</FunctionTile.Title>
      <div>status: {status}</div>
      {error && <div>error: {error.name} {error.message}</div>}
      <div className={styles.code}>
        {JSON.stringify(exampleTypedData, null, 2)}
      </div>
      <FunctionTile.Button onClick={sign}>sign</FunctionTile.Button>
      <FunctionTile.Button onClick={signBadData}>
        sign invalid data
      </FunctionTile.Button>
    </FunctionTile>
  )
}
