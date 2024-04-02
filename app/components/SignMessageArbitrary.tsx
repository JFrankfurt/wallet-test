'use client'

import { useAccount, useSignMessage, useVerifyMessage } from 'wagmi'
import FunctionTile from './functionTile'
import styles from './functionTile.module.css'
import { ChangeEvent, useState } from 'react'
import { SignableMessage } from 'viem'



const safeMessage = {
  message: 'Send $PEPE to jfrankfurt.eth',
}

export default function SignTypedData() {
  const { signMessage, status, error } = useSignMessage()
  const [sig, setSig] = useState<`0x${string}` | undefined>(undefined)
  const [message, setMessage] = useState('')
  const [encoding, setEncoding] = useState<'hex' | 'utf8'>('utf8')
  const handleEncodingChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setEncoding(event.target.value as 'hex' | 'utf8')
  }
  const sign = () => {
    const messageToSign = encoding === 'hex' ? {raw: message as `0x${string}`} : message
    signMessage({message: messageToSign}, { onSuccess: (data) => setSig(data) })
  }
  
  
  const { address } = useAccount()
  const {status: verificationStatus, error: verificationError} = useVerifyMessage({
    address,
    message: encoding === 'hex' ? {raw: message as `0x${string}`} : message,
    signature: sig,
  })

  return (
    <FunctionTile>
      <FunctionTile.Title>Sign Message</FunctionTile.Title>
      <div>{status}</div>
      {error && <div>{error.message}</div>}
      {sig && <div className={styles.code}>signature: {sig}</div>}
      {verificationStatus && <div className={styles.code}>verificationStatus: {verificationStatus}</div>}
      {verificationError && <div className={styles.code}>verificationError: {verificationError.message}</div>}
      <textarea value={message} onChange={({ target: { value } }) => setMessage(value)} />
      <fieldset>
        <legend>input type:</legend>
        <label htmlFor="utf8">
          <input type="radio" id="utf8" name="encoding" value="utf8" checked={encoding === 'utf8'} onChange={handleEncodingChange}/>
          utf8
        </label>
        <label htmlFor="hex">
          <input type="radio" id="hex" name="encoding" value="hex" checked={encoding === 'hex'} onChange={handleEncodingChange}/>
          hex
        </label>
      </fieldset>
      <FunctionTile.Button onClick={sign}>sign</FunctionTile.Button>
    </FunctionTile>
  )
}
