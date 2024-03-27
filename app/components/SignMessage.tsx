'use client'

import { useSignMessage } from 'wagmi'
import FunctionTile from './functionTile'
import styles from './functionTile.module.css'
import { useState } from 'react'

const getAllInvisibleCharsString = () => {
  const chars = [];

  // C0 Controls (U+0000 to U+001F) and C1 Controls (U+007F to U+009F)
  for (let i = 0x0000; i <= 0x001F; i++) chars.push(String.fromCharCode(i));
  for (let i = 0x007F; i <= 0x009F; i++) chars.push(String.fromCharCode(i));

  // Space and Separator characters, skipping U+0020 (regular space) for demonstration
  const spacesAndSeparators = [
    0x00A0, 0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006,
    0x2007, 0x2008, 0x2009, 0x200A, 0x2028, 0x2029, 0x202F, 0x205F, 0x3000,
  ];
  spacesAndSeparators.forEach(code => chars.push(String.fromCharCode(code)));

  // Zero-width characters and format characters
  const zeroWidthAndFormat = [
    0x200B, 0x200C, 0x200D, 0x2060, 0xFEFF,
  ];
  zeroWidthAndFormat.forEach(code => chars.push(String.fromCharCode(code)));

  return chars.join('');
};

const safeMessage = {
  message: 'Send $PEPE to jfrankfurt.eth',
}
const hexMessage = {
  message: { raw: '0x30786361666530303030636166653030303063616665303030306361666530303030' as `0x${string}` },
}
const invisMessag = {
  message: safeMessage.message + getAllInvisibleCharsString(),
}


export default function SignTypedData() {
  const { signMessage, status, error } = useSignMessage()
  const [sig, setSig] = useState('')
  const sign = () => 
    signMessage(safeMessage, { onSuccess: (data) => setSig(data) })
  
  const signInvis = () => 
    signMessage(invisMessag, { onSuccess: (data) => setSig(data) })
  
  const signHexData = () => 
    signMessage(hexMessage, { onSuccess: (data) => setSig(data) })
  
  return (
    <FunctionTile>
      <FunctionTile.Title>Sign Message</FunctionTile.Title>
      <div>{status}</div>
      {error && <div>{error.message}</div>}
      {sig && <div className={styles.code}>signature: {sig}</div>}
      <b>normal</b>
      <div className={styles.code}>
        {JSON.stringify(safeMessage, null, 2)}
      </div>
      <b>hex</b>
      <div className={styles.code}>
        {JSON.stringify(hexMessage, null, 2)}
      </div>
      <b>invis</b>
      <div className={styles.code}>
        {JSON.stringify(invisMessag, null, 2)}
      </div>
      <FunctionTile.Button onClick={sign}>sign</FunctionTile.Button>
      <FunctionTile.Button onClick={signHexData}>sign hex version</FunctionTile.Button>
      <FunctionTile.Button onClick={signInvis}>sign w/ invisible characters</FunctionTile.Button>
    </FunctionTile>
  )
}
