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
      // Custom type definition as per your application
      { name: 'data', type: 'string' },
      { name: 'amount', type: 'uint256' },
    ],
    // Additional custom types as required
  },
  message: {
    data: 'Some data',
    amount: 1000,
  },
}
export default function SignTypedData() {
  const { signTypedData, status } = useSignTypedData()
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
