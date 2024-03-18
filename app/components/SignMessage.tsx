'use client'

import { useSignMessage } from 'wagmi'
import FunctionTile from './functionTile'
import styles from './functionTile.module.css'
import { useState } from 'react'

const exampleMessage = {
  message: 'Send $PEPE to jfrankfurt.eth',
}
export default function SignTypedData() {
  const { signMessage, status } = useSignMessage()
  const [sig, setSig] = useState('')
  const sign = () => {
    signMessage(exampleMessage, { onSuccess: (data) => setSig(data) })
  }
  return (
    <FunctionTile>
      <FunctionTile.Title>Sign Typed Data</FunctionTile.Title>
      <div>{status}</div>
      {sig && <div className={styles.code}>signature: {sig}</div>}
      <div className={styles.code}>
        {JSON.stringify(exampleMessage, null, 2)}
      </div>
      <FunctionTile.Button onClick={sign}>sign</FunctionTile.Button>
    </FunctionTile>
  )
}
